#include <iostream>
#include <vector>
using namespace std;

void Print(vector<vector<int>> &board, int n){
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
            cout<<board[i][j]<<" ";
        }
        cout<<"\n";
    }
    cout<<"\n";
}

bool isSafe(vector<vector<int>> &board,int row, int col,int digit){
  //horizontal row check
        for(int i=0;i<9;i++){
            if(board[row][i]==digit){
                return false;
            }
        }
        //vertical col check
        for(int j=0;j<9;j++){
            if(board[j][col]==digit){
                return false;
            }
        }
        //sub grid check
        int grow=(row/3)*3; 
        int gcol=(col/3)*3; 
        for(int i=grow;i<=grow+2;i++){
            for(int j=gcol;j<=gcol+2;j++){
                if(board[i][j]==digit){
                    return false;
                }
            }
        }
        return true;
}
bool sudokuSolver(vector<vector<int>> &board,int row, int col,int n){
 //base case
        if(row==9){
            Print(board,n);
            return true;
            //sudoku is filled
        }
        int nextRow=row, nextCol=col+1;

        if(nextCol==9){
            nextRow=row+1;
            nextCol=0;
        } 

        if(board[row][col]!=0){
            return sudokuSolver(board,nextRow,nextCol,n);
        }
        for(int digit=1;digit<=9;digit++){
            if(isSafe(board,row,col,digit)){
                board[row][col]=digit;
                bool ans= sudokuSolver(board,nextRow,nextCol,n); 
                if(ans){
                    return true;
                }
                board[row][col]=0;
            }
        }
        return false;
}

int main()
{
    // vector<vector<char>>board={
    //     {'0','0','7','1','0','0','0','6','0'},
    //     {'1','0','5','2','0','8','0','0','0'},
    //     {'6','0','0','0','0','7','1','2','0'},
    //     {'3','1','2','4','0','5','0','0','8'},
    //     {'0','0','6','0','9','0','2','0','0'},
    //     {'0','0','0','0','0','3','0','0','1'},
    //     {'0','0','1','0','0','4','9','8','6'},
    //     {'8','0','3','9','0','6','0','0','0'},
    //     {'0','6','0','0','8','2','7','0','3'},
    // };
    int n=9;
    vector<vector<int>> board = {
    {0,0,7,1,0,0,0,6,0},
    {1,0,5,2,0,8,0,0,0},
    {6,0,0,0,0,7,1,2,0},
    {3,1,2,4,0,5,0,0,8},
    {0,0,6,0,9,0,2,0,0},
    {0,0,0,0,0,3,0,0,1},
    {0,0,1,0,0,4,9,8,6},
    {8,0,3,9,0,6,0,0,0},
    {0,6,0,0,8,2,7,0,3}
};
 sudokuSolver(board,0,0,n);
  
return 0;
}