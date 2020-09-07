import Vue from 'vue';
import {i18n} from './i18n' // 引入 i18n
import '@/assets/theme/index.css' // 引入主题
import elementLocale from 'element-ui/lib/locale';

/* 引入组件 */
import {Alert, Aside, Autocomplete, Avatar, Backtop, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, Calendar, Card, Carousel, CarouselItem, Cascader, CascaderPanel, Checkbox, CheckboxButton, CheckboxGroup, Col, Collapse, CollapseItem, ColorPicker, Container, DatePicker, Dialog, Divider, Dropdown, DropdownItem, DropdownMenu, Footer, Form, FormItem, Header, Icon, Image, Input, InputNumber, Link, Loading, Main, Menu, MenuItem, MenuItemGroup, Message, MessageBox, Notification, Option, OptionGroup, PageHeader, Pagination, Popover, Progress, Radio, RadioButton, RadioGroup, Rate, Row, Select, Slider, Spinner, Step, Steps, Submenu, Switch, Table, TableColumn, TabPane, Tabs, Tag, Timeline, TimelineItem, TimePicker, TimeSelect, Tooltip, Transfer, Tree, Upload} from 'element-ui';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

// 动态引入 Element
const Element = (ElementUI, load = false) => load && Vue.use(ElementUI);

Element(Avatar, true);
Element(Dialog, true);
Element(Autocomplete);
Element(Dropdown, true);
Element(Pagination, true);
Element(DropdownMenu, true);
Element(DropdownItem, true);
Element(Submenu);
Element(Menu, true);
Element(MenuItem, true);
Element(MenuItemGroup);
Element(Input, true);
Element(InputNumber);
Element(Radio, true);
Element(RadioGroup, true);
Element(RadioButton);
Element(Checkbox);
Element(CheckboxButton);
Element(CheckboxGroup);
Element(Switch, true);
Element(Select, true);
Element(Option, true);
Element(OptionGroup);
Element(Button, true);
Element(ButtonGroup);
Element(Table, true);
Element(TableColumn, true);
Element(DatePicker, true);
Element(TimeSelect);
Element(TimePicker);
Element(Popover);
Element(Tooltip, true);
Element(Breadcrumb);
Element(BreadcrumbItem);
Element(Form);
Element(FormItem);
Element(Tabs, true);
Element(TabPane, true);
Element(Tag, true);
Element(Tree);
Element(Alert);
Element(Slider);
Element(Icon, true);
Element(Row);
Element(Col);
Element(Upload);
Element(Progress);
Element(Spinner);
Element(Badge);
Element(Card, true);
Element(Rate);
Element(Steps);
Element(Step);
Element(Carousel);
Element(CarouselItem);
Element(Collapse);
Element(CollapseItem);
Element(Cascader);
Element(ColorPicker);
Element(Transfer);
Element(Container, true);
Element(Header, true);
Element(Aside, true);
Element(Main, true);
Element(Footer, true);
Element(Timeline);
Element(TimelineItem);
Element(Link);
Element(Divider, true);
Element(Image);
Element(Calendar);
Element(Backtop);
Element(PageHeader);
Element(CascaderPanel);
Element(Loading.directive)
Vue.component(CollapseTransition.name, CollapseTransition)

// element 组件设置 i18n
elementLocale.i18n((key, value) => i18n.t(key, value))

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 1000}; // 设置默认大小层级
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

export default i18n
