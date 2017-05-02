function calendar(year, month) {
    function loadDataOnDom(dataArr, viewDom) {
        var boxDom = viewDom;
        var rawArr = dataArr.slice();
        var trArr = [].slice.call(boxDom);

        trArr.forEach(function (good, tag) {
            var tdArr = [].slice.call(good.children);
            tdArr.forEach(function (element, order) {
                element.textContent = rawArr[tag] ? rawArr[tag][order] : null;
            });
        });
    }

    function addCurrent(targetDom, className) {
        var el = targetDom;
        var name = className;

        el.classList.add(name);
    }

    function formatDate(year, month) {
        var endDate = new Date(year, month, 0);
        var startDate = new Date(year, month - 1, 1);
        return [endDate.getDate(), startDate.getDay()];
    }

    function produceData(daySum, startDay) {
        var resArr = [];
        var counter = 1;

        resArr[0] = [];
        for (let i = startDay; i < 7; ++i) {
            resArr[0][i] = counter;
            counter++;
        }
        for (let i = 1; ; ++i) {
            resArr[i] === void 0 ? resArr[i] = [] : null;
            for (let j = 0; j < 7; ++j) {
                counter > daySum ? resArr[i][j] = null : resArr[i][j] = counter;
                counter++;
            }

            if (counter > daySum) break;
        }

        return resArr;
    }

    var relateDate = formatDate(year, month);
    var dataArr = produceData(relateDate[0], relateDate[1]);
    var viewDom = document.querySelectorAll('tbody tr');
    var targetDom = document.querySelectorAll('tbody tr td')[relateDate[1]];

    loadDataOnDom(dataArr, viewDom);
    addCurrent(targetDom, 'current');
}