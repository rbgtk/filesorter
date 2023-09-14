# filesorter

Just a simple script that follows a basic recipe:

1. move files to `pictures` or `videos`
  * create subdirectory based on their creation date "%Y-%m-%d"
  * rename them to their creation date "%Y%m%d_%H%M%S"
  * keep their extension
2. make a list of their sha256sums
3. find duplicates and remove them

I made it because I was consolidating many of my backups. 
Due to some timestamping issues, after doing step 1, I had duplicates.
Because there were over 10k files, I had to script something.
Since I will be doing this again in the future, I'll put it on a repo and improve it over time.


