class Node:
    def _init_(self, type, value=None, left=None, right=None):
        self.type = type
        self.value = value
        self.left = left
        self.right = right

import re

def tokenize(rule_string):
    return re.findall(r'\(|\)|AND|OR|[^()\s]+', rule_string)

def parse_rule(tokens):
    def parse_expression():
        if tokens[0] == '(':
            tokens.pop(0)  # Remove opening parenthesis
            left = parse_expression()
            op = tokens.pop(0)  # This should be AND or OR
            right = parse_expression()
            tokens.pop(0)  # Remove closing parenthesis
            return Node('operator', op, left, right)
        else:
            left = tokens.pop(0)
            op = tokens.pop(0)
            right = tokens.pop(0)
            return Node('comparison', op, left, right)

    return parse_expression()

def create_ast(rule_string):
    tokens = tokenize(rule_string)
    return parse_rule(tokens)

def dfs_traverse_ast(node, depth=0):
    if node is None:
        return

    indent = "  " * depth
    print(f"{indent}Type: {node.type}")
    print(f"{indent}Value: {node.value}")

    if node.type == 'operator':
        print(f"{indent}Left child:")
        dfs_traverse_ast(node.left, depth + 1)
        print(f"{indent}Right child:")
        dfs_traverse_ast(node.right, depth + 1)
    elif node.type == 'comparison':
        print(f"{indent}Left operand: {node.left}")
        print(f"{indent}Right operand: {node.right}")
        
import operator

operator_mapping = {
    '>': operator.gt,
    '<': operator.lt,
    '>=': operator.ge,
    '<=': operator.le,
    '=': operator.eq,
    '!=': operator.ne
}

def evaluate_rules(data,node):
    if node.type == 'operator':
        if node.value == 'AND':
            return evaluate_rules(data,node.left) and evaluate_rules(data,node.right)
        elif node.value == 'OR':
            return evaluate_rules(data,node.left) or evaluate_rules(data,node.right)
    elif node.type == 'comparison':
        left_operand = node.left
        operator_str = node.value
        right_operand = node.right
        
        if left_operand not in data:
            return False
        
        user_value = data[left_operand]
        right_value = int(right_operand) if right_operand.isdigit() else right_operand.strip("'")
        
        if operator_str in operator_mapping:
            return operator_mapping[operator_str](user_value, right_value)
        else:
            print(operator_str)
            print("Operator Not Found please map the operator Mappings")
        
    return False

from collections import Counter

def combine_rules(rules):
    def flatten_ast(node):
        if node.type == 'comparison':
            return [node]
        return flatten_ast(node.left) + flatten_ast(node.right)
    
    def node_to_tuple(node):
        if node.type == 'comparison':
            return (node.type, node.left, node.value, node.right)
        return (node.type, node.value)

    def tuple_to_node(t):
        if t[0] == 'comparison':
            return Node('comparison', t[2], t[1], t[3])
        return Node(t[0], t[1])
    
    all_nodes = []
    for rule in rules:
        all_nodes.extend(flatten_ast(rule))
        
    node_counts = Counter(node_to_tuple(node) for node in all_nodes)
    print(node_counts)
    
    sorted_nodes = sorted(node_counts.items(), key=lambda x: x[1], reverse=True)

    def build_optimized_ast(nodes):
        if not nodes:
            return None
        if len(nodes) == 1:
            return tuple_to_node(nodes[0][0])
        mid = len(nodes) // 2
        return Node(
            'operator',
            'OR',
            build_optimized_ast(nodes[:mid]),
            build_optimized_ast(nodes[mid:])
        )

    optimized_ast = build_optimized_ast(sorted_nodes)

    return optimized_ast

rule1 = "(((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5))"
ast = create_ast(rule1)
rule2 = "((age > 30 AND department = 'Marketing') AND (salary > 20000 OR experience > 5))"
ast2 = create_ast(rule2)
# dfs_traverse_ast(ast)

dfs_traverse_ast(combine_rules([ast, ast2]))

print(evaluate_rules({'age': 31, 'department': 'Sales', 'salary': 60000, 'experience': 6}, ast))
print(evaluate_rules({'age': 31, 'department': 'Marketing', 'salary': 10000, 'experience': 2}, ast2))