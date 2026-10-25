import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('overview button is interactive',async({page})=>{
 await page.goto('/iframe.html?id=start-here-overview--welcome&viewMode=story');
 await page.getByRole('button',{name:'눌러보기'}).click();
 await expect(page.getByText('1회 클릭')).toBeVisible();
});
test('select mouse, keyboard, Escape and wheel preserve the intended value',async({page})=>{
 await page.goto('/iframe.html?id=components-select--playground&viewMode=story');
 const trigger=page.getByRole('combobox',{name:'암호화'});
 await trigger.click();await page.getByRole('option',{name:/AES-256/}).click();
 await expect(trigger).toHaveText('AES-256 · 권장');
 await trigger.focus();await page.keyboard.press('Space');await page.keyboard.press('ArrowDown');await page.keyboard.press('Escape');
 await expect(trigger).toHaveText('AES-256 · 권장');
 await expect(trigger).toBeFocused();
 await trigger.hover();await page.mouse.wheel(0,300);
 await expect(trigger).toHaveText('AES-256 · 권장');
});
test('select exposes descriptions and does not open when disabled',async({page})=>{
 await page.goto('/iframe.html?id=components-select--disabled&viewMode=story');
 await expect(page.getByRole('combobox')).toBeDisabled();
 await expect(page.getByText('작업 중에는 변경할 수 없습니다.')).toBeVisible();
 await expect(page.getByRole('listbox')).toHaveCount(0);
});
test('long list scrolls and disabled options cannot be selected',async({page})=>{
 await page.goto('/iframe.html?id=components-select--long-list&viewMode=story');
 await page.getByRole('combobox').click();
 await expect(page.getByRole('option',{name:'워크스페이스 3',exact:true})).toHaveAttribute('data-disabled','');
 await expect(page.getByRole('option',{name:'워크스페이스 3',exact:true})).toHaveAccessibleDescription('스크롤과 키보드 이동을 확인하세요.');
 await page.keyboard.press('Home');await page.keyboard.press('ArrowDown');await page.keyboard.press('ArrowDown');
 await expect(page.getByRole('option',{name:'워크스페이스 4',exact:true})).toBeFocused();
 await page.keyboard.press('End');await expect(page.getByRole('option',{name:'워크스페이스 25',exact:true})).toBeFocused();await page.keyboard.press('Enter');
 await expect(page.getByRole('combobox')).toHaveText('워크스페이스 25');
});
test('archive settings validate, toggle visibility and reset secrets',async({page})=>{
 await page.goto('/iframe.html?id=patterns-archive-settings--playground&viewMode=story');
 await page.getByRole('combobox',{name:'형식',exact:true}).click();await page.getByRole('option',{name:/7z/}).click();
 await page.getByRole('combobox',{name:'암호화',exact:true}).click();await page.getByRole('option',{name:/AES-256/}).click();
 await expect(page.getByLabel('파일명도 암호화')).toBeChecked();
 await page.getByLabel('암호',{exact:true}).fill('fixture-only');await page.getByLabel('암호 확인',{exact:true}).fill('wrong');
 await page.getByRole('button',{name:'설정 테스트'}).click();await expect(page.getByText('암호를 동일하게 입력해 주세요.')).toBeVisible();
 await page.getByLabel('암호 표시',{exact:true}).check();await expect(page.getByLabel('암호',{exact:true})).toHaveAttribute('type','text');
 await page.getByLabel('암호 확인',{exact:true}).fill('fixture-only');
 await page.getByRole('button',{name:'설정 테스트'}).click();await expect(page.getByRole('status')).toContainText('설정 검증을 통과했습니다.');
 await expect(page.getByLabel('암호',{exact:true})).toHaveValue('');
});
test('checkbox label and space both work',async({page})=>{
 await page.goto('/iframe.html?id=components-checkbox--unchecked&viewMode=story');
 const checkbox=page.getByRole('checkbox');
 await page.getByText('파일명도 암호화',{exact:true}).click();await expect(checkbox).toBeChecked();
 await checkbox.focus();await page.keyboard.press('Space');await expect(checkbox).not.toBeChecked();
});
test('loading button cannot submit twice',async({page})=>{
 await page.goto('/iframe.html?id=components-button--loading&viewMode=story');
 const button=page.getByRole('button');
 await expect(button).toBeDisabled();await expect(button).toHaveAttribute('aria-busy','true');
});
test('field errors are programmatically associated',async({page})=>{
 await page.goto('/iframe.html?id=components-textfield--error&viewMode=story');
 const input=page.getByRole('textbox',{name:'파일 이름'});
 await expect(input).toHaveAttribute('aria-invalid','true');
 await expect(input).toHaveAccessibleDescription('같은 이름이 있습니다. 다른 이름을 입력하세요.');
});
test('mobile pattern has no horizontal overflow',async({page})=>{
 await page.setViewportSize({width:375,height:812});
 await page.goto('/iframe.html?id=patterns-archive-settings--playground&viewMode=story');
 await expect(page.getByRole('button',{name:'설정 테스트'})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});
test('overview has no automated WCAG A/AA violations',async({page})=>{
 await page.goto('/iframe.html?id=start-here-overview--welcome&viewMode=story');
 await expect(page.getByRole('button',{name:'눌러보기'})).toBeVisible();
 const results=await new AxeBuilder({page}).include('#storybook-root').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 expect(results.violations).toEqual([]);
});
test('storybook play contracts finish successfully',async({page})=>{
 for(const id of ['components-select--keyboard-contract','patterns-archive-settings--validation-contract']){
  await page.goto('/iframe.html?id='+id+'&viewMode=story');
  if(id.startsWith('components')) await expect(page.getByRole('combobox')).toHaveText('AES-256 · 권장');
  else await expect(page.getByRole('status')).toContainText('설정 검증을 통과했습니다.');
 }
});
