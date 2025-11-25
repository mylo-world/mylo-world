# class Node:
#     def __init__(self, data):
#         self.data = data
#         self.next = None

# class SingleLinkedList:
#     def __init__(self):
#         self.head = None

#     def add_data(self, data):
#         new_node = Node(data)
#         if self.head is None:
#             self.head = new_node
#         else:
#             current = self.head
#             while current.next:
#                 current = current.next
#             current.next = new_node

#     def view_data(self):
#         if self.head is None:
#             print("List is empty.")
#         else:
#             current = self.head
#             while current:
#                 print(current.data, end=' ')
#                 current = current.next
#             print()

#     def delete_data(self, data):
#         if self.head is None:
#             print("List is empty.")
#             return

#         if self.head.data == data:
#             self.head = self.head.next
#             return

#         current = self.head
#         while current.next and current.next.data != data:
#             current = current.next

#         if current.next is None:
#             print("Data not found in list.")
#         else:
#             current.next = current.next.next

# def main_menu():
#     sll = SingleLinkedList()
#     while True:
#         print("\nMenu:")
#         print("1. Tambah Data")
#         print("2. Lihat Data")
#         print("3. Hapus Data")
#         print("4. Keluar")
#         choice = int(input("Pilih opsi: "))

#         if choice == 1:
#             data = int(input("Masukkan data: "))
#             sll.add_data(data)
#         elif choice == 2:
#             sll.view_data()
#         elif choice == 3:
#             data = int(input("Masukkan data yang akan dihapus: "))
#             sll.delete_data(data)
#         elif choice == 4:
#             break
#         else:
#             print("Pilihan tidak valid.")

# if __name__ == "__main__":
#     main_menu()

# class Node:
#     def __init__(self, data):
#         self.data = data
#         self.prev = None
#         self.next = None

# class DoubleLinkedList:
#     def __init__(self):
#         self.head = None

#     def add_data(self, data):
#         new_node = Node(data)
#         if self.head is None:
#             self.head = new_node
#         else:
#             current = self.head
#             while current.next:
#                 current = current.next
#             current.next = new_node
#             new_node.prev = current

#     def view_data(self):
#         if self.head is None:
#             print("List is empty.")
#         else:
#             current = self.head
#             while current:
#                 print(current.data, end=' ')
#                 current = current.next
#             print()

#     def delete_data(self, data):
#         if self.head is None:
#             print("List is empty.")
#             return

#         if self.head.data == data:
#             self.head = self.head.next
#             if self.head:
#                 self.head.prev = None
#             return

#         current = self.head
#         while current.next and current.next.data != data:
#             current = current.next

#         if current.next is None:
#             print("Data not found in list.")
#         else:
#             current.next = current.next.next
#             if current.next:
#                 current.next.prev = current

# def main_menu():
#     dll = DoubleLinkedList()
#     while True:
#         print("\nMenu:")
#         print("1. Tambah Data")
#         print("2. Lihat Data")
#         print("3. Hapus Data")
#         print("4. Keluar")
#         choice = int(input("Pilih opsi: "))

#         if choice == 1:
#             data = int(input("Masukkan data: "))
#             dll.add_data(data)
#         elif choice == 2:
#             dll.view_data()
#         elif choice == 3:
#             data = int(input("Masukkan data yang akan dihapus: "))
#             dll.delete_data(data)
#         elif choice == 4:
#             break
#         else:
#             print("Pilihan tidak valid.")

# if __name__ == "__main__":
#     main_menu()

# Define the Node class
class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

# Function to traverse the doubly linked list 
# in forward direction
def forward_traversal(head):
  
    # Start traversal from the head of the list
    curr = head
    
    # Continue until the current node is 
    # null (end of the list)
    while curr is not None:
      
        # Output data of the current node
        print(curr.data, end=" ")
        
        # Move to the next node
        curr = curr.next
        
    # Print newline after traversal
    print()

# Function to traverse the doubly linked 
# list in backward direction
def backward_traversal(tail):
  
    # Start traversal from the tail of the list
    curr = tail
    
    # Continue until the current node 
    # is null (end of the list)
    while curr is not None:
      
        # Output data of the current node
        print(curr.data, end=" ")
        
        # Move to the previous node
        curr = curr.prev
        
    # Print newline after traversal
    print()

# Sample usage of the doubly linked list 
# and traversal functions
if __name__ == "__main__":
  
    # Create a doubly linked list with 3 nodes
    head = Node(1)
    second = Node(2)
    third = Node(3)

    head.next = second
    second.prev = head
    second.next = third
    third.prev = second

    print("Forward Traversal:")
    forward_traversal(head)

    print("Backward Traversal:")
    backward_traversal(third)
