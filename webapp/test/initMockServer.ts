import mockserver from "zts001/localService/mockserver";

export default class InitMock {
	static {
		// initialize the mock server
		mockserver.init();

		// initialize the embedded component on the HTML page
		sap.ui.require(["sap/ui/core/ComponentSupport"]);
	}
}
