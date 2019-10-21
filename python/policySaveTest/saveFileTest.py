import joblib #import pickle
# 1 mil
#1000000000

def savePolicy():
    test = {}
    for i in range(300000000):
        if i % 10000 == 0:
            print(i)
        test[i] = i
    fw = open('policy_test1', 'wb')
    joblib.dump(test, fw) 
    #pickle.dump(self.states_value, fw)
    fw.close()

def loadPolicy(file):
    fr = open(file, 'rb')
    result = joblib.load(fr)
    print(result[5])
    #self.states_value = pickle.load(fr)
    fr.close()



#savePolicy()
loadPolicy("policy_test1")
