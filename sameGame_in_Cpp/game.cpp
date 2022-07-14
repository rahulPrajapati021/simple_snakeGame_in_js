#include <iostream>
#include <conio.h>
using namespace std;
bool gameOver;

const int width = 20;
const int height = 20;

int x, y, fruitX, fruitY, score;

int tail = 0;
int tailX[100];
int tailY[100];

enum Direction
{
    STOP,
    LEFT,
    RIGHT,
    UP,
    DOWN
};

Direction dir;

void setUp()
{
    gameOver = false;
    dir = STOP;
    x = width / 2;
    y = height / 2;
    fruitX = (rand() % width) + 2;
    fruitY = (rand() % height) + 2;
}
void draw()
{
    system("cls");
    for (int i = 0; i < width + 2; i++)
    {
        cout << "-";
    }
    cout << endl;

    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            if (j == 0)
            {
                cout << "|";
            }

            if (i == y && j == x)
            {
                cout << 'O';
            }

            else if (i == fruitY && j == fruitX)
            {
                cout << 'F';
            }

            else
            {
                bool print = false;
                for (int k = 0; k < tail; k++)
                {
                    if (tailX[k] == j && tailY[k] == i)
                    {
                        cout << 'o';
                        print = true;
                    }
                }
                if (!print)
                {
                    cout << " ";
                }
            }

            if (j == width - 1)
            {
                cout << "|";
            }
        }
        cout << endl;
    }

    for (int i = 0; i < width + 2; i++)
    {
        cout << "-";
    }
    cout << endl;
    cout << "Score " << score;
    cout << " w - up \n a - left\n d - right \n s - down" << endl;
}

void input()
{
    if (_kbhit())
    {
        switch (_getch())
        {
        case 'a':
            dir = LEFT;
            break;
        case 'd':
            dir = RIGHT;
            break;
        case 'w':
            dir = UP;
            break;
        case 's':
            dir = DOWN;
            break;
        case 'x':
            gameOver = true;
            break;
        }
    }
}

void logic()
{
    int prevX = tailX[0];
    int prevY = tailY[0];
    int prev2X, prev2Y;
    tailX[0] = x;
    tailY[0] = y;

    for (int i = 1; i < tail; i++)
    {
        prev2X = tailX[i];
        prev2Y = tailY[i];
        tailX[i] = prevX;
        tailY[i] = prevY;
        prevX = prev2X;
        prevY = prev2Y;
    }

    switch (dir)
    {
    case LEFT:
        x--;
        break;
    case RIGHT:
        x++;
        break;
    case UP:
        y--;
        break;
    case DOWN:
        y++;
        break;
    }

    if (x > width || x < 0 && y > height || y < 0)
    {
        gameOver = true;
    }

    if (x == fruitX && y == fruitY)
    {
        score++;
        fruitX = rand() % width;
        fruitY = rand() % height;
        tail++;
    }

    for (int i = 0; i < tail; i++)
    {
        if (x == tailX[i] && y == tailY[i])
        {
            gameOver = true;
            cout << "you collided to yourself";
        }
        
    }
    
}

int main()
{
    setUp();
    while (!gameOver)
    {
        draw();
        input();
        logic();
    }

    return 0;
}