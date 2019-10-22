import gc
import numpy as np
import klepto
from klepto.archives import *

# def savePolicy():
#     test = {}

#     # for i in range(00000):
#     #     if i % 10000 == 0:
#     #         print(i)
#     #     test[i] = i
#     # fw = open('policy_test1', 'wb')

#     joblib.dump(test, fw) 
#     #pickle.dump(self.states_value, fw)
#     fw.close()

# def loadPolicy(file):
#     fr = open(file, 'rb')
#     result = joblib.load(fr)
#     print(result[5])
#     #self.states_value = pickle.load(fr)
#     fr.close()


policy = file_archive('policy.txt')

def savePolicy():
    policy.dump() #save changes to file
    policy.clear() #clear memory
    gc.collect() #clear memory

def loadPolicy(scoreBoard):
    score = str(scoreBoard.reshape(3 * 3))
    # print("@@")
    # print(policy.archive)
    # print(policy)
    # keys = policy.archive.keys()
    # print(len(keys))
    # print("@@")
    if score in keys: ## refactor later
        # print("score exists")
        policy.dump() #save changes to file
        policy.clear() #clear memory
        gc.collect() #clear memory
        policy.load(score)
        return (policy[score])
    else:
        # print("score no existo")
        policy[score] = {}
        policy.dump() #save changes to file 
        policy.clear()
        gc.collect() 
        policy.load(score)
        return (policy[score])    







score = np.full((3, 3), None)
score1 = np.full((3, 3), None)
score1[0][0] = 4

scoreSTR = str(score1.reshape(3 * 3))
if isinstance(scoreSTR,str):
    print ("etyy")

# P = loadPolicy(score1)
# print("--")
# print(P)
# print("--")
# P["apples"] = "blues"
# # print(P)
# print("--")
# b = loadPolicy(score1)
# print(b)
# print("--")
