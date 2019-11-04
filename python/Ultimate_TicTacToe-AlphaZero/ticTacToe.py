import numpy as np

import klepto
from klepto.archives import *

import tensorflow as tf
import keras
from keras import layers
from keras.models import Model
from keras import models
from keras.optimizers import Adam
import numpy as np
import math
from collections import deque
import os
import time
from datetime import datetime
import h5py
import copy


BOARD_ROWS = 3
BOARD_COLS = 3


class State:
    def __init__(self, p1, p2):
        self.board = self.createBoard()
        self.p1 = p1
        self.p2 = p2
        self.isEnd = False
        self.boardHash = None
        # init p1 plays first
        self.playerSymbol = 1
        self.score = np.full((3, 3), None) 
        self.lastPosition = (0,0,0,0) 
        self.p1Wins = 0
        self.p2Wins = 0    
        self.pTies = 0
        self.start = time.process_time()   
        self.end = time.process_time()          
        self.prev = time.process_time()

    # get unique hash of current board state
    def getHash(self):
        self.boardHash = str(self.board.reshape(BOARD_COLS * BOARD_ROWS * BOARD_COLS * BOARD_ROWS))
        return self.boardHash

    def createBoard(self):    
        # x = np.array([[1,2,3], [4,5,6], [7,8,9], [10, 11, 12]])
        # v = np.array([1, 0, 1])
        # vv = np.tile(v, (4, 1))   # Stack 4 copies of v on top of each other
        # print(vv)                 # Prints "[[1 0 1]
        #                         #          [1 0 1]
        #                         #          [1 0 1]
        #                         #          [1 0 1]]"


        board = np.zeros((BOARD_ROWS, BOARD_COLS,BOARD_ROWS, BOARD_COLS))               
        return board

    def winnerBoard(self,lastPosition): #3x3 grid? 
        # row
        # board = 3 X 3
        lastx = lastPosition[0]
        lasty = lastPosition[1]
        board = self.board[lastx,lasty]

        for i in range(BOARD_ROWS):
            if sum(board[i, :]) == 3:
                self.score[lastx,lasty] = 1
                self.board[lastx,lasty] = 1
                self.p1.loadPolicy2(self.score)
                self.p2.loadPolicy2(self.score)
                # self.isEnd = True
                return 1
            if sum(board[i, :]) == -3:
                self.score[lastx,lasty] = -1
                self.board[lastx,lasty] = -1
                self.p1.loadPolicy2(self.score)
                self.p2.loadPolicy2(self.score)
                # self.isEnd = True
                return -1
        # col
        for i in range(BOARD_COLS):
            if sum(board[:, i]) == 3:
                self.score[lastx,lasty] = 1 
                self.board[lastx,lasty] = 1
                self.p1.loadPolicy2(self.score)
                self.p2.loadPolicy2(self.score)
                # self.isEnd = True
                return 1
            if sum(board[:, i]) == -3:
                self.score[lastx,lasty] = -1
                self.board[lastx,lasty] = -1
                self.p1.loadPolicy2(self.score)
                self.p2.loadPolicy2(self.score)
                # self.isEnd = True
                return -1
        # diagonal
        diag_sum1 = sum([board[i, i] for i in range(BOARD_COLS)])
        diag_sum2 = sum([board[i, BOARD_COLS - i - 1] for i in range(BOARD_COLS)])
        diag_sum = max(abs(diag_sum1), abs(diag_sum2))
        if diag_sum == 3:
            # self.isEnd = True
            if diag_sum1 == 3 or diag_sum2 == 3:
                self.score[lastx,lasty] = 1
                self.board[lastx,lasty] = 1
                self.p1.loadPolicy2(self.score)
                self.p2.loadPolicy2(self.score)
                return 1
            else:
                self.score[lastx,lasty] = -1
                self.board[lastx,lasty] = -1
                self.p1.loadPolicy2(self.score)
                self.p2.loadPolicy2(self.score)
                return -1

        #still spots open
        for i in range(BOARD_ROWS):
            for j in range(BOARD_COLS):
                if board[i, j] == 0:
                    return None
        
        #tie
        self.score[lastx,lasty] = 0
        self.p1.loadPolicy2(self.score)
        self.p2.loadPolicy2(self.score)
        return 0

    def winner(self): #whole game      
        # row 
        for i in range(BOARD_ROWS):
            if sum(filter(None, self.score[i, :])) == 3:
                self.isEnd = True
                return 1
            if sum(filter(None, self.score[i, :])) == -3:
                self.isEnd = True
                return -1
        # col
        for i in range(BOARD_COLS):
            if sum(filter(None, self.score[:, i])) == 3:
                self.isEnd = True
                return 1
            if sum(filter(None, self.score[:, i])) == -3:
                self.isEnd = True
                return -1
        # diagonal
        diag_sum1 = sum( filter(None, [self.score[i, i] for i in range(BOARD_COLS)]))
        diag_sum2 = sum( filter(None, [self.score[i, BOARD_COLS - i - 1] for i in range(BOARD_COLS)]))
        diag_sum = max(abs(diag_sum1), abs(diag_sum2))
        if diag_sum == 3:
            self.isEnd = True
            if diag_sum1 == 3 or diag_sum2 == 3:
                return 1
            else:
                return -1

        # not end, spots available
        for i in range(BOARD_ROWS):
            for j in range(BOARD_COLS):
                if self.score[i, j] == None:                      
                    self.isEnd = False
                    return None
        
        # tie
        # no available positions
        self.isEnd = True        
        return 0

 
    def availablePositions(self, lastPosition): #**********************************************************       
        positions = []
        flag = False
        for i in range(BOARD_ROWS):
            for j in range(BOARD_COLS):
                if self.board[lastPosition[2],lastPosition[3],i, j] == 0:
                    positions.append((lastPosition[2],lastPosition[3],i, j)) 
                    flag = True
        
        if not flag:
            for i in range(BOARD_ROWS):
                for j in range(BOARD_COLS):
                    if self.score[i][j] == None:
                        for k in range(BOARD_ROWS):
                            for l in range(BOARD_COLS):
                                if self.board[i][j][k][l] == 0:
                                    positions.append((i,j,k,l))                      

        return (flag, positions)

    def updateState(self, position):
        self.board[position] = self.playerSymbol
        self.winnerBoard(position)
        self.lastPosition = position
        # switch to another player
        self.playerSymbol = -1 if self.playerSymbol == 1 else 1

        # self.showBoard()
        # print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

    # only when game ends
    def giveReward(self):
        result = self.winner()
        # backpropagate reward
        if result == 1:
            self.p1.feedReward(1)
            self.p2.feedReward(0)
            # print("p1 won")
            self.p1Wins += 1
        elif result == -1:
            self.p1.feedReward(0)
            self.p2.feedReward(1)
            self.p2Wins += 1
        else: # tie
            self.p1.feedReward(0.1)
            self.p2.feedReward(0.5)
            self.pTies += 1

    # board reset
    def reset(self):
        self.board = self.createBoard()
        self.boardHash = None
        self.isEnd = False
        self.playerSymbol = 1
        self.score = np.full((3, 3), None)
        self.lastPosition = (0,0,0,0)

    def play(self, rounds=100):
        for i in range(rounds):
            if i % 1000 == 0:
                self.end = time.process_time()
                print("=============")
                print("total min: " + str((self.end - self.start) / 60))
                print("current Time: " + str(self.end - self.prev))                
                self.prev = self.end
                print(len(self.p1.policy.archive.keys()))                

                print("Rounds {}".format(i))
                print ("p1 wins"  + str(self.p1Wins)) 
                print ("p2 wins"  + str(self.p2Wins))
                print ("ties wins" + str(self.pTies))
            while not self.isEnd:                
                # Player 1                
                positions = self.availablePositions(self.lastPosition)[1] 
                p1_action = self.p1.chooseAction(positions, self.board, self.playerSymbol)
                # take action and upate board state
                self.updateState(p1_action)
                board_hash = self.getHash()
                self.p1.addState(board_hash, self.score)
                # check board status if it is end

                win = self.winner()
                if win is not None:
                    # self.showBoard()
                    # ended with p1 either win or draw
                    
                    self.giveReward()
                    self.p1.reset()
                    self.p2.reset()
                    self.reset()  
                    # print("****************************************************************************")                  
                    break

                else:
                    # Player 2
                    positions = self.availablePositions(self.lastPosition)[1]
                    p2_action = self.p2.chooseAction(positions, self.board, self.playerSymbol)
                    self.updateState(p2_action)
                    board_hash = self.getHash()
                    self.p2.addState(board_hash , self.score)

                    win = self.winner()
                    if win is not None:
                        # self.showBoard()
                        # ended with p2 either win or draw                                          
                        
                        self.giveReward()
                        self.p1.reset()
                        self.p2.reset()
                        self.reset()
                        # print("****************************************************************************")
                        break

    # play with human
    def play2(self):
        while not self.isEnd:
            # Player 1
            positions = self.availablePositions()[1]
            p1_action = self.p1.chooseAction(positions, self.board, self.playerSymbol)
            # take action and upate board state
            self.updateState(p1_action)
            self.showBoard()
            # check board status if it is end
            win = self.winner()
            if win is not None:
                if win == 1:
                    print(self.p1.name, "wins!")
                else:
                    print("tie!")
                self.reset()
                break

            else:
                # Player 2
                positions = self.availablePositions()[1]
                p2_action = self.p2.chooseAction(positions)

                self.updateState(p2_action)
                self.showBoard()
                win = self.winner()
                if win is not None:
                    if win == -1:
                        print(self.p2.name, "wins!")
                    else:
                        print("tie!")
                    self.reset()
                    break

    def showBoard(self):
        # p1: x  p2: o
        for i in range(0, BOARD_ROWS):            
                for k in range(0, BOARD_ROWS):                    
                    out = '  '
                    for j in range(0, BOARD_COLS):
                        for l in range(0, BOARD_COLS):                            
                            if self.board[i, j, k, l] == 1:
                                token = 'x'
                            if self.board[i, j, k, l] == -1:
                                token = 'o'
                            if self.board[i, j, k, l] == 0:
                                token = ' '
                            out += token + " "
                            if l != BOARD_ROWS - 1 :
                                out += '| '
                        if j != BOARD_ROWS - 1:
                            out += '  #   '   
                    print(out)
                    if k != BOARD_ROWS - 1:
                        print(' -----------     -----------     -----------')
                if i != BOARD_ROWS - 1:
                    print()
                    print('#  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #')
                    print()
        print('------------------------------------------')

class Player:
    def __init__(self, name, exp_rate=0.3):
        self.name = name
        self.states = []  # record all positions taken
        self.lr = 0.2
        self.exp_rate = exp_rate
        self.decay_gamma = 0.9
        self.states_value = {}  # state -> value
        self.policy = file_archive('policy_' + name + '.txt')

    def getHash(self, board):
        boardHash = str(board.reshape(BOARD_COLS * BOARD_ROWS * BOARD_COLS * BOARD_ROWS))
        return boardHash

    # @jit(nopython=True)
    def chooseAction(self, positions, current_board, symbol): #**********************************************************
        if np.random.uniform(0, 1) <= self.exp_rate:
            # take random action
            idx = np.random.choice(len(positions))
            action = positions[idx]
        else:
            value_max = -999            
            for p in positions:
                next_board = current_board.copy()
                next_board[p] = symbol
                next_boardHash = self.getHash(next_board)
                value = 0 if self.states_value.get(next_boardHash) is None else self.states_value.get(next_boardHash)
                # print("value", value)
                if value >= value_max:
                    value_max = value
                    action = p
        # print("{} takes action {}".format(self.name, action))
        return action

    # append a hash state
    def addState(self, state, scoreBoard):
        score = str(scoreBoard.reshape(3 * 3))
        self.states.append((state, score))

    # at the end of game, backpropagate and update states value
    def feedReward(self, reward): 
        lastBoard = ""
        for state in reversed(self.states):
            st = state[0]
            board = state[1]

            if lastBoard != board:
                self.loadPolicy2(board)
                lastBoard = board

            #do logic if board is same as last
            if self.states_value.get(st) is None:
                self.states_value[st] = 0
            self.states_value[st] += self.lr * (self.decay_gamma * reward - self.states_value[st])
            reward = self.states_value[st]

    def reset(self):
        self.states = []    

    # def savePolicy2():
    #     self.policy.dump() #save changes to file
    #     self.policy.clear() #clear memory
    #     gc.collect() #clear memory

    def loadPolicy2(self, scoreBoard):
        if isinstance(scoreBoard,str):
            score = scoreBoard
        else:
            score = str(scoreBoard.reshape(3 * 3))

        keys = self.policy.archive.keys()
        # print("@@")
        # print(policy.archive)
        # print(policy)        
        # print(len(keys))
        # print("@@")
        if score not in keys: ## refactor later            
            # print("score no existo")
            self.policy[score] = {}

            
        self.policy.dump() #save changes to file
        self.policy.clear() #clear memory
        gc.collect() #clear memory
        self.policy.load(score) #load score
        self.states_value = self.policy[score]
        return (self.policy[score])   

    # def savePolicy(self):
    #     fw = open('policy_' + str(self.name), 'wb')
    #     joblib.dump(self.states_value, fw) 
    #     #pickle.dump(self.states_value, fw)
    #     fw.close()

    # def loadPolicy(self, file):
    #     fr = open(file, 'rb')
    #     self.states_value = joblib.load(fr)
    #     #self.states_value = pickle.load(fr)
    #     fr.close()


class HumanPlayer:
    def __init__(self, name):
        self.name = name

    def chooseAction(self, positions):
        while True:
            row = int(input("Input your action row:"))
            col = int(input("Input your action col:"))
            action = (row, col)
            if action in positions:
                return action

    # append a hash state
    def addState(self, state):
        pass

    # at the end of game, backpropagate and update states value
    def feedReward(self, reward):
        pass

    def reset(self):
        pass


if __name__ == "__main__":
    # training
     
    p1 = Player("p1")
    p2 = Player("p2")

    st = State(p1, p2)
    print("training...")
    st.play(50000)

    # p1.savePolicy()
    # p2.savePolicy()


    
    
    
    
    # play with human
    # p1 = Player("computer", exp_rate=0)
    # p1.loadPolicy("policy_p1")

    # p2 = HumanPlayer("human")

    # st = State(p1, p2)
    # st.play2()


    # testing
    # st.createBoard()
    # st.showBoard()
    # print(st.board)
    # print("----")
    # st.board[0,0] = 1
    # print(st.board[0,0] )

    # st.showBoard()



    


    #TODO
    # available postions 
    # winner
    # play 
    # feed reward
    # choose action
    # human play interation
    # hard coded start game



#Garbage 


        
        # print(board)   
        # print("----")
        # board[0][0][0][0] = "1"
        # self.board[1][0][1][1] = "1"
        # print(board)    
    
