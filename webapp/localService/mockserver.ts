import UriParameters from "sap/base/util/UriParameters";
import MockServer from "sap/ui/core/util/MockServer";

export default {
	init: function () {
		// create
		const oMockServer = new MockServer({
			rootUri: "https://services.odata.org/V2/Northwind/Northwind.svc/",
		});

		const oUriParameters = new UriParameters(window.location.href);

		// configure mock server with a delay
		MockServer.config({
			autoRespond: true,
			autoRespondAfter: parseInt(oUriParameters.get("serverDelay")) || 500,
		});

		// simulate
		const sPath = sap.ui.require.toUrl("zts001/localService");
		oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

		// start
		oMockServer.start();
	}
};
