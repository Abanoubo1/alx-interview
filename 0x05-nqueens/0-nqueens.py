#!/usr/bin/python3
"""
This script solves the N Queens problem using backtracking.

The N Queens problem is the challenge of placing
N non-attacking queens on an N×N chessboard.

Usage:
    python3 0-nqueens.py N

where N must be an integer greater or equal to 4.

The script prints every possible solution to the
problem, one solution per line. Each solution is a list of lists,
where each inner list represents a queen's position on the chessboard.
The first number in the inner list is the row
index and the second number is the column index.

Example:
    python3 0-nqueens.py 4

Output:
    [[0, 1], [1, 3], [2, 0], [3, 2]]
    [[0, 2], [1, 0], [2, 3], [3, 1]]
"""

import sys


def solve_n_queens(n):
    """
    Solve the n queens problem.

    :param n: The number of queens.
    :return: All possible solutions.
    """

    def can_place(pos, ocuppied_positions):
        """
        Check if a queen can be placed at the given position.

        :param pos: The position to check.
        :param ocuppied_positions: The positions that
        are already occupied by queens.
        :return: True if a queen can be placed at the position,
        False otherwise.
        """
        length = len(ocuppied_positions)
        for i in range(length):
            if (ocuppied_positions[i] == pos or
                    ocuppied_positions[i] - i == pos - length or
                    ocuppied_positions[i] + i == pos + length):
                return False
        return True

    def place_queen(n, index, ocuppied_positions):
        """
        Place a queen on the chessboard.

        :param n: The number of queens.
        :param index: The current index.
        :param ocuppied_positions: The positions that are already
        occupied by queens.
        :return: All possible ways to place the remaining queens.
        """
        if index == n:
            return [ocuppied_positions]
        else:
            result = []
            for pos in range(n):
                if can_place(pos, ocuppied_positions):
                    result += place_queen(n, index + 1,
                                          ocuppied_positions + [pos])
            return result

    return place_queen(n, 0, [])


def print_result(result):
    """
    Print the result.

    :param result: The result to print.
    """
    for res in result:
        print([[i, res[i]] for i in range(len(res))])


if len(sys.argv) != 2:
    print("Usage: nqueens N")
    sys.exit(1)

try:
    n = int(sys.argv[1])
except ValueError:
    print("N must be a number")
    sys.exit(1)

if n < 4:
    print("N must be at least 4")
    sys.exit(1)

print_result(solve_n_queens(n))
