# PoC — Comparación de Frameworks de Testing

**Desarrollo de Software** — UTN Facultad Regional Rosario

---

## Descripción

Este repositorio forma parte del trabajo práctico de la asignatura **Desarrollo de Software** de la **UTN FRRo**. Consiste en una _Proof of Concept (PoC)_ cuyo objetivo es comparar distintos frameworks y herramientas de testing aplicados a una misma aplicación base.

La aplicación es un sistema simple de inicio de sesión y gestión de tareas desarrollado en React + Vite + TypeScript. Su única finalidad es servir como banco de pruebas para implementar y comparar suites de test equivalentes en diferentes tecnologías.

Actualmente el proyecto cuenta con implementaciones completas para **Vitest** y **Jest**, diseñadas para ser funcionalmente equivalentes y permitir una comparación académicamente válida entre ambos frameworks. La incorporación de **Mocha** queda planteada aquí https://github.com/ChocobarCM/PoC-suite-test-Mocha/blob/main/README.md .

---

## Objetivos

- Comparar distintos frameworks de testing sobre una misma base de código.
- Evaluar la facilidad de configuración de cada framework.
- Comparar la experiencia de desarrollo (API, sintaxis, herramientas asociadas).
- Comparar el rendimiento y la velocidad de ejecución de las suites.
- Analizar la integración con el ecosistema React + Vite.
- Mantener una correspondencia funcional exacta entre las suites para que la comparación sea justa.

---

## Tecnologías

| Tecnología | Rol |
|---|---|
| React | Biblioteca de interfaz de usuario |
| Vite | Build tool y dev server |
| TypeScript | Lenguaje de programación |
| Vitest | Framework de testing (implementación principal) |
| Jest | Framework de testing (implementación equivalente) |
| Testing Library | Testing de componentes React |
| Mock Service Worker (MSW) | Mockeo de API REST |
| React Router | Enrutamiento del lado del cliente |

La implementación principal y más desarrollada corresponde a **Vitest**. La suite de **Jest** se mantiene como referencia para la comparación. Ambas suites cubren exactamente los mismos 46 casos de prueba funcionales y 1 snapshot.

---

## Funcionalidades de la aplicación

- **Login**: formulario de inicio de sesión con validación de campos.
- **Dashboard**: panel principal que muestra las tareas del usuario autenticado.
- **CRUD de tareas**: crear, listar, marcar como completada y eliminar tareas.
- **Protección de rutas**: las rutas privadas redirigen al login si no hay sesión activa.
- **Backend simulado**: todas las operaciones contra la API se resuelven mediante MSW, sin necesidad de un servidor real.

---

## Estructura del proyecto

```
├── src/
│   ├── api/            # Llamadas a la API (fetch)
│   ├── components/     # Componentes React (Button, Input, TaskForm, etc.)
│   ├── context/        # Contexto de autenticación
│   ├── hooks/          # Custom hooks (useTasks)
│   ├── mocks/          # Handlers y server de MSW
│   ├── pages/          # Páginas (LoginPage, DashboardPage)
│   └── types/          # Definiciones de tipos
├── tests/
│   ├── jest/           # Suite de tests con Jest
│   │   ├── __snapshots__/
│   │   ├── api.test.ts
│   │   ├── auth.integration.test.tsx
│   │   ├── components.test.tsx
│   │   ├── dashboard.integration.test.tsx
│   │   ├── useTasks.test.tsx
│   │   ├── useTasks.mocked.test.tsx
│   │   ├── setup.ts
│   │   └── test-utils.tsx
│   └── vitest/         # Suite de tests con Vitest
│       ├── __snapshots__/
│       ├── api.test.ts
│       ├── auth.integration.test.tsx
│       ├── components.test.tsx
│       ├── dashboard.integration.test.tsx
│       ├── useTasks.test.tsx
│       ├── useTasks.mocked.test.tsx
│       ├── setupTests.ts
│       └── test-utils.tsx
├── jest.config.cjs
├── vitest.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

Ambas suites de testing mantienen la misma estructura de archivos y la misma distribución de tests para facilitar la comparación.

---

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

### Desarrollo

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

### Compilación

Compilar el proyecto para producción:

```bash
npm run build
```

### Testing

Ejecutar la suite de **Vitest**:

```bash
npm run test
```

Ejecutar la suite de **Jest**:

```bash
npm run test:jest
```

Ejecutar Jest en modo _watch_:

```bash
npm run test:jest:watch
```

> Nota: el comando `npm test` ejecuta Vitest por ser el framework principal de la PoC.

---

## Estado del proyecto

- La aplicación se encuentra completamente implementada y funcional.
- La suite de pruebas con **Vitest** está completa: 47 tests (46 funcionales + 1 snapshot) distribuidos en 6 archivos.
- La suite de pruebas con **Jest** está completa e implementa los mismos casos de prueba que Vitest, garantizando la equivalencia funcional entre ambas.
- La incorporación de **Mocha** queda pendiente como trabajo a futuro para extender la comparación.

---

## Integrantes
Vitest:
- De Giovanni, Bianca
- Cabardos, Matias
- Kasperczak, Ian
  
Jest:
- Felicevich, Mirko
- Linch, Baltasar
- Ponzano, Benjamin
  
Mocha:
-Astudilla, Santiago
-Chocobar, Carlos
-Tarantola, Federico

---

## Licencia

Proyecto académico desarrollado exclusivamente con fines educativos en el marco de la asignatura **Desarrollo de Software** de la **UTN FRRo**. Sin fines comerciales.
