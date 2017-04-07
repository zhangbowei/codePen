var itemB = document.querySelector('ul > li')
var itemA = document.getElementsByTagName('ul')[1].getElementsByTagName('li')[2]

swapDomNode([itemA, itemB]);

function swapDomNode(dataArr, fn) {
    function getRelatedNode(node) {
        const parent = node.parentNode;

        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i] === node) {
                return {
                    behind: parent.children[i + 1],
                    parent: node.parentNode
                };
            }
        }

        return null;
    }

    function insertNode(node, related) {
        const behind = related.behind;
        const parent = related.parent;

        behind ? parent.insertBefore(node, behind) : parent.appendChild(node);
    }

    const nodeArr = dataArr.slice();
    const swapRule = fn ? fn : function(index, len) {
        return index === len - 1 ? 0 : index + 1;
    }
    const relatedArr = nodeArr.reduce(function (prev, node) {
        prev.push(getRelatedNode(node));
        return prev;
    }, []);

    nodeArr.forEach(function (node, index) {
        insertNode(node, relatedArr[swapRule(index, nodeArr.length)]);
    });
}