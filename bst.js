class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    sortAndRemoveDupes(array) {
        const sorted = [...new Set(array)].sort((a, b) => a - b);
        return sorted;
    }

    buildTree(array) {
        let sorted = this.sortAndRemoveDupes(array);
        if (sorted.length === 0) return null;
        const mid = parseInt(sorted.length / 2);
        const root = new Node(
            sorted[mid],
            this.buildTree(sorted.slice(0, mid)),
            this.buildTree(sorted.slice(mid + 1))
        );
        return root;
    }

    insert(value, position = this.root) {
        if (position === null) return new Node(value);
        if (position.data < value) {
            position.right = this.insert(value, position.right);
        } else if (position.data > value) {
            position.left = this.insert(value, position.left);
        }
        return position;
    }

    delete(value, position = this.root) {
        if (position === null) {
            return position;
        }
        if (position.data < value) {
            position.right = this.delete(value, position.right);
        } else if (position.data > value) {
            position.left = this.delete(value, position.left);
        } else if (position.data === value) {
            if (position.left === null) {
                return position.right;
            } else if (position.right === null) {
                return position.left;
            }
            if (position.left && position.right) {
                let replaceValue = this.findNextBiggest(position.right);
                position.data = replaceValue;
                position.right = this.delete(replaceValue, position.right);
            }
        }
        return position;
    }

    findNextBiggest(position) {
        let value = position.data;
        while (position.left !== null) {
            position = position.left;
            value = position.data;
        }
        return value;
    }

    find(value, position = this.root) {
        if (position === null) {
            return null;
        }
        if (position.data > value) {
            return this.find(value, position.right);
        } else if (position.data < value) {
            return this.find(value, position.left);
        } else if (position.data === value) {
            return position;
        }
    }

    // Breadth First Traversal (level by level)
    levelOrder(callback) {
        if (!this.root) {
            return null;
        }
    
        const queue = [this.root];
        const values = [];
    
        while (queue.length) {
            let level = [];
            const levelSize = queue.length;
    
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                level.push(node.data);
    
                if (node.left) {
                    queue.push(node.left);
                }
    
                if (node.right) {
                    queue.push(node.right);
                }
    
                if (callback) {
                    callback(node);
                }
            }
    
            values.push(level);
        }
    
        return values;
    }

    height(position = this.root) {
        if (position === null) {
            return 0;
        }
        const leftHeight = this.height(position.left);
        const rightHeight = this.height(position.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node, root = this.root, depth = 0) {
        if (!node || !root) {
            return null
        } else if (node.data == root.data) {
            return depth
        }

        if (node.data > root.data) {
            return this.depth(node, root.right, depth + 1)
        } else if (node.data < root.data) {
            return this.depth(node, root.left, depth + 1)
        }
    }

    isBalanced(position = this.root) {
        if (position == null) {
            return true;
        }
    
        const diff = Math.abs(this.height(position.left) - this.height(position.right));
    
        if (diff <= 1) {
            const leftBalanced = this.isBalanced(position.left);
            const rightBalanced = this.isBalanced(position.right);
    
            return leftBalanced && rightBalanced;
        } else {
            return false;
        }
    }

    rebalance() {
        if (this.root === null) {
            return;
        }
        const nodes = [...new Set(this.levelOrder().sort((a, b) => a - b))]; 
        this.root = this.buildTree(nodes)
    }
}

      /**
   * 3 methods for depth-first traversal
   * Stack: Last In, First Out
   * Preorder (root left right) and Postorder (left right root) uses stack.
   * Inorder (left root right) uses iteration.
   */




let tree = new Tree([1, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11]);
console.log(tree)
console.log(tree.isBalanced())
