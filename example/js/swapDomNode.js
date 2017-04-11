var itemB = document.querySelector('ul > li')
var itemA = document.getElementsByTagName('ul')[1].getElementsByTagName('li')[2]

swapDomNode([itemA, itemB]);

function swapDomNode(nodeArr, swapRuleFn) {
    function getRelatedNode(node) {
        const res = { parent: node.parentNode };
        const childrenArr = node.parentNode.children;

        for (let i = 0; i < childrenArr.length; i++) {
            if (childrenArr[i] === node) {
                res.behind = childrenArr[i + 1] ? childrenArr[i + 1] : undefined;
                break;
            }
        }

        return res;
    }

    function insertNode(node, relatedNode) {
        const behind = relatedNode.behind;
        const parent = relatedNode.parent;

        behind ? parent.insertBefore(node, behind) : parent.appendChild(node);
    }

    const rawArr = nodeArr.slice();
    const relatedArr = rawArr.reduce(function(prev, item) {
        return prev.concat([getRelatedNode(item)]);
    }, []);
    const fn = swapRuleFn ? swapRuleFn : function(index, len) {
        return index === len - 1 ? 0 : index + 1;
    };

    rawArr.forEach(function(item, index) {
        insertNode(item, relatedArr[fn(index, rawArr.length)]);
    });
}