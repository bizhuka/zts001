import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import type { MetadataOptions } from "sap/ui/core/Element";
import RatingIndicator, { RatingIndicator$LiveChangeEvent } from "sap/m/RatingIndicator";
import Label from "sap/m/Label";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Button from "sap/m/Button";


/**
 * @namespace zts001.controller
 */
 export default class ProductRating extends Control {

    constructor(idOrSettings?: string | $ProductRatingSettings);
    constructor(id?: string, settings?: $ProductRatingSettings);
    constructor(id?: string, settings?: $ProductRatingSettings) { super(id, settings); }

	static readonly metadata: MetadataOptions = {
		properties : {
            value: 	{type : "float", defaultValue : 0}
        },
        aggregations : {
            _rating : {type : "sap.m.RatingIndicator", multiple: false, visibility : "hidden"},
            _label : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
            _button : {type : "sap.m.Button", multiple: false, visibility : "hidden"}
        },
        events : {
            change : {
                parameters : {
                    value : {type : "int"}
                }
            }
        }
	}

    init(): void {
        this.setAggregation("_rating", new RatingIndicator({
            value: this.getValue(),
            iconSize: "2rem",
            visualMode: "Half",
            liveChange: this._onRate.bind(this)
        }));

        this.setAggregation("_label", new Label({
            text: "{i18n>productRatingLabelInitial}"
        }).addStyleClass("sapUiSmallMargin"));

        this.setAggregation("_button", new Button({
            text: "{i18n>productRatingButton}",
            press: this._onSubmit.bind(this)
        }).addStyleClass("sapUiTinyMarginTopBottom"));
    }

    setValue (fValue: float) {
        this.setProperty("value", fValue, true);
        (this.getAggregation("_rating") as RatingIndicator).setValue(fValue);

        return this;
    }

    reset () {
        const oResourceBundle = (this.getModel("i18n") as ResourceModel) .getResourceBundle() as ResourceBundle;

        this.setValue(0);
        (this.getAggregation("_label") as Label).setDesign("Standard");
        (this.getAggregation("_label") as Label).setText(oResourceBundle.getText("productRatingLabelInitial"));
        
        (this.getAggregation("_rating") as RatingIndicator).setEnabled(true);
        (this.getAggregation("_button") as Button).setEnabled(true);
    }

    _onRate  (oEvent: RatingIndicator$LiveChangeEvent) {
        const oResourceBundle = (this.getModel("i18n") as ResourceModel) .getResourceBundle() as ResourceBundle;
        const fValue = oEvent.getParameter("value");

        this.setProperty("value", fValue, true);

        (this.getAggregation("_label") as Label).setText(oResourceBundle.getText("productRatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()]));
        (this.getAggregation("_label") as Label).setDesign("Bold");
    }

    _onSubmit  () { //oEvent: Button$PressEvent
        const oResourceBundle = (this.getModel("i18n") as ResourceModel) .getResourceBundle() as ResourceBundle;

        (this.getAggregation("_rating") as RatingIndicator).setEnabled(false);
        (this.getAggregation("_label") as Label).setText(oResourceBundle.getText("productRatingLabelFinal"));
        (this.getAggregation("_button") as Button).setEnabled(false);
        this.fireEvent("change", {
            value: this.getValue()
        });
    }

	renderer = {  
		apiVersion: 2,
		render: (oRm: RenderManager, oControl: ProductRating) => {
            oRm.openStart("div", oControl);
			oRm.class("myAppDemoWTProductRating");
			oRm.openEnd();
			oRm.renderControl(oControl.getAggregation("_rating") as Control);
			oRm.renderControl(oControl.getAggregation("_label") as Control);
			oRm.renderControl(oControl.getAggregation("_button") as Control);
			oRm.close("div");
		}
	}
}