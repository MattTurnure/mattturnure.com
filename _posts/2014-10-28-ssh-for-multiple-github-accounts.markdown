---
layout: post
title:  "SSH for Multiple GitHub Accounts"
date:   2014-10-28 12:01:00
categories: jekyll update
---

Recently, I needed to create another GitHub account and realized that I needed to set up SSH permissions. After much trial and error, I ended up on a [Jeffrey Way tutorial](http://code.tutsplus.com/tutorials/quick-tip-how-to-work-with-github-and-multiple-accounts--net-22574).

I mean, who doesn&#8217;t love [Jeffrey Way](http://jeffrey-way.com/)?

Anyhow, everything worked for me, but I was getting this error: <code>Bad owner or permissions</code>. That was easily fixed with this command: <code>chmod 644 config</code>.

Now I am up and running with no issues.