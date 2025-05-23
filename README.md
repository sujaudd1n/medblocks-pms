## Patients Management System

## Setup and Usage

Step 1: Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/sujaudd1n/medblocks-pms.git
cd medblocks-pms
```

Step 2: Run the development server 

```bash
npm i
npm run dev
```

Step 3: Open [http://localhost:3000](http://localhost:3000) in your browser to view the result.

## Challenges During Development

- The combination of **Select** and **Dialog** UI components from Radix UI did not work well. Sometimes it caused infinite recursion, and sometimes the default value was not set correctly. To fix the issue, I had to use the raw `select` HTML tag.

- As I was using NextJS, some configuration was required to use PGLite live queries. During deployment, this caused issues. After reading the PGLite documentation, I fixed the issue by adding necessary configuration, and it is now working well in production.
