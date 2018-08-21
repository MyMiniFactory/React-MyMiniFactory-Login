import { toParams } from './utils';

class Popup {
    constructor(url, height, width, title = {}) {
        this.url = url;
        this.height = height;
        this.width = width;
        this.title = title;
    }

    

    open() {
        const { url, height, width, title } = this;

        var y = window.top.outerHeight / 2 + window.top.screenY - ( height / 2)
        var x = window.top.outerWidth / 2 + window.top.screenX - ( width / 2)

        this.window = window.open(url, title, "width="+width+", height="+height+", top="+y+", left="+x);
    }

    close() {
        this.cancel();
        this.window.close();
    }

    poll() {
        this.promise = new Promise((resolve, reject) => {
            this._iid = window.setInterval(() => {
                try {
                    const popup = this.window;
                    if (!popup || popup.closed !== false) {
                        this.close();

                        reject(new Error('The popup was closed'));

                        return;
                    }

                    if (popup.location.href === this.url || popup.location.pathname === 'blank') {
                        return;
                    }

                    const params = toParams(popup.location.search.replace(/^\?/, ''));

                    resolve(params);
                    this.close();
                } catch (error) {
                    /*
                     * Ignore DOMException: Blocked a frame with origin from accessing a
                     * cross-origin frame.
                     */
                }
            }, 500);
        });
    }

    cancel() {
        if (this._iid) {
            window.clearInterval(this._iid);
            this._iid = null;
        }
    }

    then(...args) {
        return this.promise.then(...args);
    }

    catch(...args) {
        return this.promise.then(...args);
    }

    static open(...args) {
        const popup = new this(...args);

        popup.open();
        popup.poll();

        return popup;
    }
}

export default Popup;
