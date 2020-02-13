# boilerplate workspace for a typescript-based npm package

Some details here are specific to the @musicenviro scope

## what this is trying to set up for you in advance:

-   Typescript config
-   ts-node
-   ESLint
-   Prettier
-   type definitions for node

## how to use this boilerplate

1. copy the folder and rename it.

2. `rm -rf .git` to remove existing commits, then `git init`

3. edit package.json to update package name (scoped?), version, and description

4. `rm package-lock.json && rm -rf node_modules && npm i`

5. create repository on github

    - note: is this necessary for github but not for gitlab?
    - note: call it musicenviro-\<projectname\>. The corresponding npm package, if that's what this is,
      will be called @musicenviro/\<projectname\>

6. create first commit and push:
    ```
    git add .
    git commit -m "first commit (copied from @musicenviro/boilerplate)"
    git remote add origin https://github.com/geofholbrook/musicenviro-\<projectname\>.git
    git push -u origin master
    ```
