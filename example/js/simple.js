function bindViewToModal(domArr) {
    function getConf(dom, key) {
        const realKey = ['_', key].join('');
        return {
            set(val) {
                this[realKey] = val;
                dom.value = val;
            },
            get(val) {
                return this[realKey];
            }
        };
    }

    return Array.from(domArr).reduce(function(stock, good) {
        const key = good.getAttribute('bind');
        Object.defineProperty(stock, key, getConf(good, key));
        return stock;
    });
}

function dependModalOnView(domArr) {
    const modal = Array.from(domArr).reduce(function(stock, good) {
        stock[good.getAttribute('on')] = void 0;
        return stock;
    }, {});

    document.body.addEventListener('input', function(event) {
        const el = event.target;

        if(Array.from(domArr).includes(el)) {
            const key = el.getAttribute('on');
            modal[key] = el.value;
        }
    });

    return modal;
}

function mapModalAToB(modalA, modalB) {
    function getConf(modal, key) {
        return {
            set(val) {
                modal[key] = val;
            },
            get(val) {
                return modal[key];
            }
        };
    }

    Object.keys(modalA).forEach(function(key) {
        Object.defineProperty(modalA, key, getConf(modalB, key));
    });
}
