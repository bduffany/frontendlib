"use strict";
exports.__esModule = true;
exports.runProcessor = exports.RequestProcessingPipelineBuilder = void 0;
var tslib_1 = require("tslib");
/** Builder for a request processing pipeline. */
var RequestProcessingPipelineBuilder = /** @class */ (function () {
    function RequestProcessingPipelineBuilder() {
        this.before = [];
        this.after = [];
        this.errorHandlers = [];
    }
    /** Adds processors to run before the main request processor. */
    RequestProcessingPipelineBuilder.prototype.addPreProcessors = function () {
        var processors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            processors[_i] = arguments[_i];
        }
        for (var _a = 0, processors_1 = processors; _a < processors_1.length; _a++) {
            var processor = processors_1[_a];
            this.before.push(processor);
        }
        return this;
    };
    /** Adds processors to run after the main request processor. */
    RequestProcessingPipelineBuilder.prototype.addPostProcessors = function () {
        var processors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            processors[_i] = arguments[_i];
        }
        for (var _a = 0, processors_2 = processors; _a < processors_2.length; _a++) {
            var processor = processors_2[_a];
            this.after.push(processor);
        }
        return this;
    };
    /**
     * Adds error handlers to the pipeline.
     *
     * Error handlers are run if any middleware throws an error.
     */
    RequestProcessingPipelineBuilder.prototype.addErrorHandlers = function () {
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        for (var _a = 0, handlers_1 = handlers; _a < handlers_1.length; _a++) {
            var handler = handlers_1[_a];
            this.errorHandlers.push(handler);
        }
        return this;
    };
    /**
     * Converts the pipeline to middleware compatible with connect and
     * related frameworks (express, Next.js).
     */
    RequestProcessingPipelineBuilder.prototype.build = function (main) {
        var _this = this;
        return function (req, res, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var processors, _i, processors_3, processor, e_1, handled, _a, _b, handler;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        processors = tslib_1.__spreadArrays(this.before, [main], this.after);
                        _i = 0, processors_3 = processors;
                        _c.label = 1;
                    case 1:
                        if (!(_i < processors_3.length)) return [3 /*break*/, 6];
                        processor = processors_3[_i];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, runProcessor(processor, req, res)];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _c.sent();
                        handled = false;
                        for (_a = 0, _b = this.errorHandlers; _a < _b.length; _a++) {
                            handler = _b[_a];
                            try {
                                handler(req, res, e_1);
                                handled = true;
                                break;
                            }
                            catch (e) {
                                continue;
                            }
                        }
                        if (handled)
                            return [2 /*return*/];
                        if (next) {
                            next(e_1);
                        }
                        else {
                            throw e_1;
                        }
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        if (next)
                            next();
                        return [2 /*return*/];
                }
            });
        }); };
    };
    return RequestProcessingPipelineBuilder;
}());
exports.RequestProcessingPipelineBuilder = RequestProcessingPipelineBuilder;
/**
 * Runs the given processor, returning a promise that resolves when
 * the processor is finished running, and rejects if the processor
 * encounters an internal error or explicitly calls "next" with an
 * error object.
 */
function runProcessor(processor, req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var resolved = false;
                        var rejected = false;
                        var returnValue = processor(req, res, function (error) {
                            if (error) {
                                if (!rejected) {
                                    rejected = true;
                                    reject(error);
                                }
                            }
                            else if (!resolved) {
                                resolved = true;
                                resolve();
                            }
                        });
                        if (returnValue instanceof Promise) {
                            returnValue
                                .then(function (value) {
                                if (!resolved)
                                    resolve(value);
                            })["catch"](function (e) {
                                if (!rejected)
                                    reject(e);
                            });
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.runProcessor = runProcessor;
//# sourceMappingURL=index.js.map