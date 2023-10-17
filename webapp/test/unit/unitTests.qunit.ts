// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

// import all your QUnit tests here
void Promise.all([import("unit/controller/Main.qunit"), import("unit/model/formatter")]).then(() => {
	QUnit.start();
});
