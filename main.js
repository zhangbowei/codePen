function initExampleHTML(originData) {
    const rawData = originData.slice();
    const formatString = function(data) {
        let template = `<li class="layout_li ajaxposts">
                            <article class="postgrid wow bounceInUp animated" style="visibility: visible;">
                                <figure class="iframe-wrap">
                                    <a class="cover-link" href="{{path}}" target="_blank"></a>
                                    <iframe src="{{path}}"></iframe>
                                </figure>
                                <section class="gallery_main">
                                    <div class="homeinfo">
                                        <span class="category">
                                            <a href="{{path}}" rel="tag" target="_blank">{{name}}</a>
                                        </span>
                                    </div>
                                </section>
                            </article>
                        </li>`;
        return template.replace(/\{\{(.*?)\}\}/g, function(all, item) {
            return data[item];
        });
    };

    return rawData.reduce(function(prev, item) {
        const data = item.match(/\/([^\/]+)\.html$/);
        return data ? prev.concat([formatString({path: item, name: data[1]})]) : prev;
    }, []);
};

function formatPathData(data) {
    return data.split('\n');
}

$(function () {
    const el = document.querySelector(".layout_ul.ajaxposts");

    const exampleArr = initExampleHTML(formatPathData(pathData));

    exampleArr.forEach(function(item) {
        el.innerHTML += item;
    });
});