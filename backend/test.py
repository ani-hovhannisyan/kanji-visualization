class Point:
    kind = 'cat'
    def __init__(self, x, y):
        self._x = x
        self._y = y
    #def __init__(self, name):
        #self.name = name      
    def output(self):
        print('Point(%d, %d)' % (self._x, self._y))

class Allow:
    kind = 'dog'
    def __init__(self,x,y):
        self._x = x
        self._y = y
    #def __init__(self, name):
        #self.name = name    

    def output(self):
        print('Allow(%d, %d)' % (self._x, self._y))

p1 = Point(1, 2)
p2 = Allow(3, 4)
p1.output()
p2.output()
