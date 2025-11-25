# # Python Program to insert a node at the beginning of doubly
# # linked list


# class Node:
#     def __init__(self, new_data):
#         self.data = new_data
#         self.next = None
#         self.prev = None

# # Function to insert a new node at the front of doubly linked list
# def insert_at_front(head, new_data):
    
#     # Create a new node
#     new_node = Node(new_data)

#     # Make next of new node as head
#     new_node.next = head

#     # Change prev of head node to new node
#     if head is not None:
#         head.prev = new_node

#     # Return the new node as the head of the doubly linked list
#     return new_node

# def print_list(head):
#     curr = head
#     while curr is not None:
#         print(f" {curr.data}", end='')
#         curr = curr.next
#     print()  
    
# if __name__ == "__main__":
  
#     # Create a hardcoded doubly linked list:
#     # 2 <-> 3 <-> 4
#     head = Node(2)
#     head.next = Node(3)
#     head.next.prev = head
#     head.next.next = Node(4)
#     head.next.next.prev = head.next

#     # Print the original list
#     print("Original Linked List:", end='')
#     print_list(head)

#     # Insert a new node at the front of the list
#     print("After inserting Node at the front:", end='')
#     data = 5
#     head = insert_at_front(head, data)

#     # Print the updated list
#     print_list(head)

# Python Program to insert a node after a given node of doubly linked list

class Node:
    def __init__(self, new_data):
        self.data = new_data
        self.next = None
        self.prev = None

def insert_after(head, key, new_data):
    curr = head

    # Iterate over Linked List to find the key
    while curr is not None:
        if curr.data == key:
            break
        curr = curr.next

    # If curr becomes None, the given key is not found in the linked list
    if curr is None:
        return head

    # Create a new node
    new_node = Node(new_data)

    # Set prev of new node to the given node
    new_node.prev = curr

    # Set next of new node to the next of the given node
    new_node.next = curr.next

    # Update next of the given node to new node
    curr.next = new_node

    # Update the prev of new node's next with the new node
    if new_node.next is not None:
        new_node.next.prev = new_node

    return head

def print_list(head):
    curr = head
    while curr is not None:
        print(f" {curr.data}", end='')
        curr = curr.next
    print()

if __name__ == "__main__":
  
    # Create a hardcoded doubly linked list:
    # 1 <-> 3 <-> 4
    head = Node(1)
    head.next = Node(3)
    head.next.prev = head
    head.next.next = Node(4)
    head.next.next.prev = head.next

    # Print the original list
    print("Original Linked List:", end='')
    print_list(head)

    # Insert a new node after node with data 1
    print("Inserting Node with data 2 after node 1 :", end='')
    data = 2
    key = 1 
    head = insert_after(head, key, data)

    # Print the updated list
    print_list(head)
