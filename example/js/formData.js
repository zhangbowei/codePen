$('button').click(function () {
    const domArr = $('#test-form [name]');
    const rawArr = Array.prototype.slice.call(domArr);

    const res = rawArr.reduce(function (prev, item) {
        return (item.type !== "radio" || item.checked) ? prev.concat([{ [item.name]: item.value }]) : prev;
    }, []);

    console.log(JSON.stringify(res));
});
