function swapDomNode(nodeA, nodeB) {
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

    const nodeArr = [nodeA, nodeB];
    const relatedArr = nodeArr.reduce(function (prev, node) {
        prev.push(getRelatedNode(node));
        return prev;
    }, []);

    nodeArr.forEach(function (node, index) {
        insertNode(node, relatedArr[1 - index]);
    });
}