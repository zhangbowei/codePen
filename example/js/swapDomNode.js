var itemB = document.querySelector('ul > li')
var itemA = document.getElementsByTagName('ul')[1].getElementsByTagName('li')[2]

swapDomNode([itemA, itemB]);

function swapDomNode(nodeArr) {
    function getRelatedNode(node) {
        return {
            parent: node.parentNode,
            behind: node.nextSibling
        }
    }
    function insertNode(node, relatedNode) {
        const parent = relatedNode.parent;
        const behind = relatedNode.behind;

        parent.insertBefore(node, behind);
    }

    nodeArr.reduce(function (prev, node) {
        return prev.concat([getRelatedNode(node)]);
    }, []).forEach(function(relatedNode, index) {
        insertNode(nodeArr[index === nodeArr.length-1 ? 0 : index+1], relatedNode);
    });
}


window.addEventListener('storage', function (event) {
    console.log(event);
});
localStorage.setItem('logged-on', 12333);