class Point:
    kind = 'cat'
    def __init__(self, name):
        self.name = name      

class Allow:
    kind = 'dog'
    def __init__(self, name):
        self.name = name    

d = Point('aaa')
e = Allow('aaa')
print(d.kind)
print(e.kind)
print(d.name)
print(e.name)