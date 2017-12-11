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
    j = 3
    print("i=2 j=3 to number")
    print(CoordinateToNumber(i,j,m,n))
    print()
    
    t1 = 23
    print("23 to coordinates")
    print(NumberToCoordinate(t1,m,n))
    print()
    
    t1 = 31
    t2 = 23
    print("distance between 31 and 23")
    print(Distance(t1,t2,m,n))
    print()
readMap()


def generateNeighbors(t1,n,m):
    island = []
    result = []
    
    #up
    num = t1 - m
    island.append(num)
    #down
    num = t1 + m
    island.append(num)
    #left
    if (t1 % n != 1):
        num = t1 - 1
        island.append(num)
    #right
    if (t1 % n != 0):
        num = t1 + 1
        island.append(num)
        
    
    for num in island:
        if (num in landcell_List):
             result.append(num)              
        
    return result

def exploreIsland(t1,n,m):
    neighbors = [t1]
    for neighbor in neighbors:
        #print (neighbor)
        newones = generateNeighbors(neighbor,n,m)
        for one in newones:
            if one not in neighbors:
                neighbors.append(one)    
    return neighbors

def findIsland():
    

    
    landcell_List_copy = landcell_List
    island_List = []
    n = 12
    m = 12
    for land in landcell_List_copy:
        
        island = exploreIsland(land,n,m)
        landcell_List_copy = [x for x in landcell_List_copy if x not in island]
        island.sort()
        if island not in island_List:
            island_List.append(island)
        
    print (island_List)

landcell_List = [10,11,25,12,50,51,80,81,82,9]
print(landcell_List)
print("into islands")
findIsland()







