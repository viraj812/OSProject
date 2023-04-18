import hashlib

str = "user"

result = hashlib.sha256(str.encode())
print(result.hexdigest())
