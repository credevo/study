list = [1,2,3,4,5,6]

#슬라이싱은 복사본 만들어낸다는 의미다?
print(list[1:3])

print(list[0:3])
print(list[:3])
print(list[2:])
print(list[2:6])

print('----------------')


list.append(7)
print(list[-6:-2:1]);

removed = list.pop(1)
print(list)
print(removed)
list.remove(1)
print(list)

print(len(list))

print('-------------')
list.sort()
print(list)

list.reverse()
print(list)

#백문이 불여일타 ㅋㅋ

arr = ["감자", "당근", "애호박", "양파"]

arr.insert(1,arr.pop(2));
print(arr)

print(arr.pop());
print(arr.append("계란"));