import math

def CoordinateToNumber(i,j,m,n):
    t = (i)*n +(j)
    return t

def NumberToCoordinate(t,m,n):
    i = t / m
    i = math.floor(i)
    j = t - (i*m)
    return (i,j)

def Distance(t1,t2,m,n):
    distance = 0
    i,j = NumberToCoordinate(t1,m,n)
    i1,j1 = NumberToCoordinate(t2,m,n)
    distance = abs(i - i1) + abs(j - j1) -1
    return distance
    
def readMap():
    mapFile = "kevin-butryn.txt"
    mapinfo = open(mapFile,"r")
    island_Cord =[]
    i = 0
    j = 0
    m = 0
    n = 0
    t1 = 0
    t2 = 0

    
    for i,row in enumerate(mapinfo):
        print("row ",i, " = ", row)
        m = i + 1
        for j, island in enumerate(row):
            n = j + 1
            if (island == 'X'):
                island_Cord.append((i,j))


    print("------------------------")
    print(island_Cord)
    print()
    print("size of array is M x N = ",m," X ",n)
    print()
    
    i = 2
    j = 0
    print(CoordinateToNumber(i,j,m,n))
    
    t1 = 20
    print(NumberToCoordinate(t1,m,n))

    t1 = 31
    t2 = 23
    print(Distance(t1,t2,m,n))
          
readMap()
