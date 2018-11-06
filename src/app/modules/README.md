# Modules

Each app's module has its own folder, containing an independent structure composed by models,
reducers, selectors, components, etc... It's worth mentioning that the files will be named so that it'll
get easier to locate them among IDE/debugger tabs. For instance:


```
modules
│
└───user
│   │
│   └───model
│   │   │   userModel.js
│   │   │   userModel.test.js
│   │   └───index.js
│   │
│   └───reducer
│       │   userReducer.js
│       │   userReducer.test.js
│       └───index.js
└───...

```