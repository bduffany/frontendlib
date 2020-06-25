/**
 * Server infrastructure for handling HTTP requests.
 */
import { __awaiter, __generator, __spreadArrays } from "tslib";
/** Builder for a request processing pipeline. */
var RequestProcessingPipelineBuilder = /** @class */ (function () {
    function RequestProcessingPipelineBuilder() {
        this.before = [];
        this.after = [];
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
    };
    /**
     * Converts the pipeline to middleware compatible with connect and
     * related frameworks (express, Next.js).
     */
    RequestProcessingPipelineBuilder.prototype.toMiddleware = function (main) {
        var _this = this;
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var processors, _i, processors_3, processor, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        processors = __spreadArrays(this.before, [main], this.after);
                        _i = 0, processors_3 = processors;
                        _a.label = 1;
                    case 1:
                        if (!(_i < processors_3.length)) return [3 /*break*/, 6];
                        processor = processors_3[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, runProcessor(processor, req, res)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
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
export { RequestProcessingPipelineBuilder };
/**
 * Runs the given processor, returning a promise that resolves when
 * the processor is finished running, and rejects if the processor
 * encounters an internal error or explicitly calls "next" with an
 * error object.
 */
export function runProcessor(processor, req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        processor(req, res, function (error) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=server.js.map