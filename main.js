function processIframe(data, el) {
    el[0].onload = function () {
        function format(a) {
            if (!a) {
                return a;
            }
            return a.includes('rem') ? a : a = a + ',' + (parseInt(a) * ratio / 100).toFixed(2) + 'rem';
        }
        function changeTarget(target) {
            let [width, height] = [$(target).attr('data-width'), $(target).attr('data-height')];
            width = format(width);
            height = format(height);
            $(target).attr('data-width', width).attr('data-height', height);
        }
        function initViewer() {
            const targetArr = Array.from(doc.find('[data-width], [data-height]'));
            targetArr.forEach(function (target) {
                changeTarget(target);
            });
        }
        function setClipboardText(event, value) {
            if (event.clipboardData) {
                return event.clipboardData.setData("text/plain", value);
            } else if (window.clipboardData) {
                return window.clipboardData.setData("text", value);
            }
        }
        function quadrant(box, point) {
            if (point.y < box.y / 2) {
                if (point.x < box.x / 2) {
                    return 1;
                } else {
                    return 2;
                }
            } else {
                if (point.x < box.x / 2) {
                    return 3;
                } else {
                    return 4;
                }
            }
        }
        //balloon插件，复制成功提示
        el.contents().find('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/balloon-css/0.5.0/balloon.min.css">');

        const doc = el.contents();
        const ratio = (data.param / doc.find('#layers').width());
        const td = doc.find('#td>div');
        const rd = doc.find('#rd>div');
        const bd = doc.find('#bd>div');
        const ld = doc.find('#ld>div');

        initViewer();
        //同步外轴
        doc.on('mousemove', function () {
            [td, rd, bd, ld].forEach(function (item) { changeTarget(item) });
        });
        //换页，重置
        doc.find('#artboards').click(() => {
            initViewer();
        });
        //复制到剪切版
        doc.find('#screen').click((e) => {
            const el = $(e.target);
            const w = el.attr('data-width'), h = el.attr('data-height');
            let value = '';
            if (w && h) {
                value = el.attr('data-width');
                // setClipboardText(e, value);
                doc.execCommand("Copy");
                //区域
            } else {
                value = w ? w : (h ? h : '');
            }
            value = value.split(',')[1];
            //设置值
            //反馈

        });

    }
    el.attr('src', data.url);
}

$(function () {
    const data = { url: "http://localhost:8080/require/", param: 750 };
    const parent = document.querySelector(".layout_ul.ajaxposts");

    processIframe(data, $('#target'));

    $(document).on(
        "input",
        _.debounce(function (event) {
            const el = event.target;
            data[el.name] = el.value;
            processIframe(data, $('#target'));
        })
    );
});
