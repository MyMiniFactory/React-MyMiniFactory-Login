import { toParams } from './utils';

class Popup {
    constructor(url, options = {}) {
        this.url = url;
        this.options = options;
    }

    open() {
        const { url, height, width, title } = this;
        
        let left = (window.screen.width/2)-(width/2);
        let top = (window.screen.height/2)-(height/2);

        console.log(height, width)

        this.window = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+width+', height='+height+', top='+top+', left='+left);
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
                    console.log(popup.location.search)
                    if (!popup || popup.closed !== false) {
                        this.close();

                        reject(new Error('The popup was closed'));

                        return;
                    }

                    if (popup.location.href === this.url || popup.location.pathname === 'blank') {
                        return;
                    }

                    const params = toParams(popup.location.search.replace(/^\?/, ''));
                    console.log(params)

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
