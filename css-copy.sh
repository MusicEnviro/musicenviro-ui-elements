find ./src -name "*.css" | while read line; do
	echo "copying $line to ./lib"
	cp "$line" "./lib${line:5}"
done
