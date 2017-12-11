import math
import networkx as nx

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
    global m
    global n
    global island_Cord
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
        newones = generateNeighbors(neighbor,n,m)
        for one in newones:
            if one not in neighbors:
                neighbors.append(one)    
    return neighbors

def findIsland():
    global island_List
    landcell_List_copy = landcell_List
    island_List = []
    for land in landcell_List_copy:
        
        island = exploreIsland(land,n,m)
        landcell_List_copy = [x for x in landcell_List_copy if x not in island]
        island.sort()
        if island not in island_List:
            island_List.append(island)
        

def islandDistance(isl1,isl2):
    distance = 999
    for cord1 in isl1:
        for cord2 in isl2:
            newDistance = Distance(cord1,cord2,m,n)
            
            if (distance > newDistance):
                distance = newDistance
    return distance

def islandGraph():
    graph = []
    numIslands = len(island_List)
    
    island_List_Copy = island_List
    for x, island in enumerate(island_List):
        for y, isl in enumerate(island_List_Copy):
            if x >= y:
                continue
            graph.append([x,y,islandDistance(island_List[x],island_List_Copy[y])])
    return graph





readMap()
landcell_List = []

for cord in island_Cord:
    i,j = cord
    num = CoordinateToNumber(i,j,m,n)
    landcell_List.append(num)


findIsland()
graph = islandGraph()


G=nx.cycle_graph(len(island_List))
for z, island in enumerate(graph):
    a,b,c = graph[z]
    G.add_edge(a,b,weight=c)
T=nx.minimum_spanning_tree(G)
print(sorted(T.edges(data=True)))










