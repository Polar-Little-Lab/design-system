import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'./tests',fullyParallel:true,
 use:{baseURL:'http://127.0.0.1:6006',trace:'retain-on-failure'},
 projects:[{name:'chromium',use:{browserName:'chromium'}}],
 webServer:{command:'npm run preview',url:'http://127.0.0.1:6006',reuseExistingServer:!process.env.CI},
 reporter:process.env.CI?'github':'list',
});
