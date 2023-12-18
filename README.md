# rollup-plugin-svg-symbols

Rollup/Vite alternative to the package [SVG sprite loader](https://github.com/JetBrains/svg-sprite-loader) for Webpack from JetBrains.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
  - [Custom SVG directory](#custom-svg-directory) 
- [Usage](#usage)
  - [Vue + Vite](#vue--vite)
    - [Basic example](#basic-example-vue--vite)
    - [Dynamic example](#dynamic-example-vue--vite)
  - [React + Vite](#react--vite)
    - [Basic example](#basic-example-react--vite)
    - [Dynamic example](#dynamic-example-react--vite)
- [Contributing](#contributing)
- [License](#license)

## Installation

### npm
```shell
npm install rollup-plugin-svg-symbols --save-dev
```

### yarn
```shell
yarn add rollup-plugin-svg-symbols --dev
```

### bun
```shell
bun add rollup-plugin-svg-symbols --dev
```


## Configuration
```js
// rollup.config.js or vite.config.js
import svgSymbols from 'rollup-plugin-svg-symbols';

export default {
  plugins: [
    // ...other plugins like vue() or react()
    svgSymbols(),
  ],
};
```
### Custom SVG directory
```js
svgSymbols({ baseUrl: 'src/icons' }) // defaults to 'assets/svg'
```
This configuration will recursively look for SVG files inside `'src/icons'`.


## Usage
### Vue + Vite
#### Basic example
```vue
<template>
  <svg :viewBox="MyIcon.viewBox" aria-hidden="true">
    <use :href="MyIcon.id" />
  </svg>
</template>

<script setup>
import MyIcon from '@/assets/icons/my-icon.svg';
</script>
```

#### Dynamic example
##### SvgIcon.vue
```vue
<template>
  <svg :viewBox="svg.viewBox" aria-hidden="true">
    <use :href="`#${svg.id}`" />
  </svg>
</template>

<script setup>
const props = defineProps({
  icon: String
});

const svgImports = import.meta.glob('../../assets/**/*.svg');
const svg = ref({ id: '', viewBox: '0 0 0 0' });

const loadSvg = async () => {
  const path = `../../assets/svg/icons/${props.icon}.svg`;
  const importedSvg = await svgImports[path]();
  svg.value = importedSvg.default;
};

watchEffect(() => {
  loadSvg();
});
</script>
```

##### Using SvgIcon component
```vue
<template>
  <SvgIcon icon="my-icon" />
  <SvgIcon icon="nested-folder/my-other-icon" />
</template>
```

### React + Vite
#### Basic example
```jsx
import MyIcon from '@/assets/icons/my-icon.svg';

export default function App() {
  return (
    <>
      <svg viewBox={MyIcon.viewBox} aria-hidden="true">
        <use href={MyIcon.id} />
      </svg>
    </>
  );
};
```

#### Dynamic example
##### SvgIcon.jsx
```jsx
import { useState, useEffect } from 'react';

const SvgIcon = ({ icon }) => {
  const [svg, setSvg] = useState({ id: '', viewBox: '0 0 0 0' });

  useEffect(() => {
    const loadSvg = async () => {
      const path = `../../assets/svg/icons/${icon}.svg`;
      const importedSvg = await import(path);
      setSvg(importedSvg.default);
    };

    loadSvg();
  }, [icon]);

  return (
    <svg viewBox={svg.viewBox} aria-hidden="true">
      <use href={`#${svg.id}`} />
    </svg>
  );
};

export default SvgIcon;
```

##### Using SvgIcon component
```jsx
import SvgIcon from './SvgIcon';

export default function App() {
  return (
    <>
      <SvgIcon icon="my-icon" />
      <SvgIcon icon="nested-folder/my-other-icon" />
    </>
  );
};
```

## Contributing

We welcome contributions to improve `rollup-plugin-svg-symbols`.
To contribute, please follow these guidelines:

- **Reporting Issues**: If you encounter any issues or have suggestions, please open an issue on the [GitHub repository](https://github.com/njesenberger/rollup-plugin-svg-symbols).
- **Pull Requests**: Feel free to submit pull requests. Ensure your code follows the project's coding standards.


## License

`rollup-plugin-svg-symbols` is licensed under MIT license. For more information, refer to the [LICENSE](https://github.com/njesenberger/rollup-plugin-svg-symbols/blob/main/LICENSE) file.
