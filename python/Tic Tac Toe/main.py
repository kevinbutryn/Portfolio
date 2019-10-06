#Tic Tac Toe 
import time

def printBoard(board):
    # "board" is a list of 10 strings representing the board (ignore index 0)
    print('   |   |')
    print(' ' + board[0] + ' | ' + board[1] + ' | ' + board[2])
    print('   |   |')
    print('-----------')
    print('   |   |')
    print(' ' + board[3] + ' | ' + board[4] + ' | ' + board[5])
    print('   |   |')
    print('-----------')
    print('   |   |')
    print(' ' + board[6] + ' | ' + board[7] + ' | ' + board[8])
    print('   |   |')

def checkWinner(board):
    #check horizontal
    if board[0] == board[1] == board[2] != ' ':
        return True , board[0]
    if board[3] == board[4] == board[5] != ' ':
        return True , board[3]
    if board[6] == board[7] == board[8] != ' ':
        return True , board[6]
    
    #check vertical
    if board[0] == board[3] == board[6] != ' ':
        return True , board[0]
    if board[1] == board[4] == board[7] != ' ':
        return True , board[1]
    if board[2] == board[5] == board[8] != ' ':
        return True , board[2]
    
    #check diagnol
    if board[0] == board[4] == board[8] != ' ':
        return True , board[0]
    if board[2] == board[4] == board[6] != ' ':
        return True , board[2]
    
    return False, 'TIE'

def isEmpty(board, place):
    return board[place] == ' '

def createBoard():
    board = [ ' ' for x in range (9)]
    return board

def placePiece(board, place, piece):
    if (isEmpty(board, place)):
        board[place] = piece
    else:
        return False

def isBoardFull(board):
    for b in board:
        if b == ' ':
            return False
    return True

def winningMove(board,player):
    move = -1

    #vertical
    a = board[0::3]
    print(a.count(player))
    if a.count(player) = 2:
        return a.index(" ")
    b = board[1::3]
    print(b)
    c = board[2::3]
    print(c)
    print("-------")
    #horizontal
    d = board[0:3]
    print(d.count(player))
    e = board[3:6]
    print(e)
    f = board[6:9]
    print(f)
    print("-------")
    #diagnol
    g = board[0::4]
    print(g)
    h = board[2:7:2]
    print(h)

def checkBestMove(board,player):
    
    
    #check for winning move
    #move = winningMove(board,player)

    if player == "X":
        enemey = "O"
    else:
        enemey = "X"

    #check for block win


def chooseRandomEmpty(board):
    possibleOptions = []
    for i in range(len(board)):
        if (board[i] == ' '):
            possibleOptions.append(i)
    
    import random
    length = len(possibleOptions)

    r = random.randrange(0, length)
    return possibleOptions[r]

def playRandAIvsRandAI(board):
    print ("starting Game ...")
    player = "X"

    while( not isBoardFull(board) and not checkWinner(board)[0]):
        spot = chooseRandomEmpty(board)
        confirm = placePiece(board,spot,player)

        if (confirm):
            break

        if (player == "X"):
            player = "O"
        else:
            player = "X"


        print("*******************")
        printBoard(board)
        time.sleep(1)

    print("The Winner is " + checkWinner(board)[1])
    return

def playgame(board):
    print ("starting Game ...")
    while( not isBoardFull(board) and not checkWinner(board)[0]):
       print ("game running")
       time.sleep(2)

    print("The Winner is " + checkWinner(board)[1])
    return

def main():
    #board = createBoard()
    #playRandAIvsRandAI(board)

    print("*****")
    board = ["X","X","","","","","","",""]
    d = board[0:3]
    print(d)
    e = board[3:6]
    print(e)
    f = board[6:9]
    print(f)
    print("*****")
    winningMove(board,"X")



main()