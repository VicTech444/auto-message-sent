var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var $ = function (selector) { return document.querySelector(selector); };
var $dateNow = $("#date-now");
var $emailList = $(".email-list");
var $emptyContainer = $(".empty-container");
var $containerWithInfo = $(".container-with-info");
var $emailName = $(".email-name-container");
var $emailBody = $(".email-body");
var $manualMessage = $("#manual-message");
var $sendManualMessageBtn = $("#send-manual-message");
var $openProgramMenu = $(".open-auto-message");
var $program = $(".auto-message-program");
var $closeMenu = $(".closing-menu");
var $amountEmails = $("#amount-emails");
var $selectAllMessages = $("#all-messages");
var $selectPersonalize = $("#personalize");
var $startFromContainer = $(".start-from");
var $endToContainer = $(".end-to");
var $startFrom = $("#start-from");
var $endTo = $("#end-to");
var $autoMessageToSend = $("#auto-message");
var $errorMessage = $(".error-message");
var $acceptAutoMessageBtn = $("#accept-automessage");
var $confirmAutoMessageContainer = $(".confirm-automessage");
var $startSpan = $("#start-span");
var $endSpan = $("#end-span");
var $autoMessageConfirm = $("#message-to-send-textarea");
var $confirmAutoMessageBtn = $("#confirm-automessage");
var $cancelAutoMessageBtn = $("#cancel-automessage");
var maxOverflow;
var maxUnderFlow = 1;
var objectDate = new Date();
$dateNow.innerHTML = objectDate.toLocaleDateString();
var getInfoFromApi = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/comments")];
            case 1: return [2 /*return*/, (_a.sent()).json()];
        }
    });
}); };
var placeInfoInBothDivs = function () { return __awaiter(_this, void 0, void 0, function () {
    var information, documentFragmentEmail, documentFragmentBody, i, _a, postId, id, name_1, email, body, divEmail, divBody;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getInfoFromApi()];
            case 1:
                information = _b.sent();
                documentFragmentEmail = document.createDocumentFragment();
                documentFragmentBody = document.createDocumentFragment();
                maxOverflow = information.length;
                $startFrom.setAttribute('min', "".concat(maxUnderFlow));
                $startFrom.setAttribute('max', "".concat(maxOverflow));
                $endTo.setAttribute('min', "".concat(maxUnderFlow));
                $endTo.setAttribute('max', "".concat(maxOverflow));
                $amountEmails.innerHTML = "".concat(maxOverflow);
                for (i = 0; i < information.length; i++) {
                    _a = information[i], postId = _a.postId, id = _a.id, name_1 = _a.name, email = _a.email, body = _a.body;
                    divEmail = document.createElement("DIV");
                    divEmail.classList.add("email-".concat(i + 1));
                    divEmail.innerHTML = "".concat(name_1);
                    divEmail.addEventListener("click", function (ev) {
                        if ($containerWithInfo === null || $containerWithInfo === void 0 ? void 0 : $containerWithInfo.classList.contains('hidden')) {
                            $containerWithInfo === null || $containerWithInfo === void 0 ? void 0 : $containerWithInfo.classList.remove('hidden');
                            $emptyContainer === null || $emptyContainer === void 0 ? void 0 : $emptyContainer.classList.add('hidden');
                        }
                        removeHiddenFromBody(ev);
                    });
                    divBody = document.createElement("DIV");
                    divBody.classList.add("body", "email-".concat(i + 1), 'hidden');
                    divBody.setAttribute("name", "".concat(name_1));
                    divBody.innerHTML = "<div class=\"email-name-container fs-22\" id=\"email-name-".concat(i + 1, "\">").concat(email, "</div>\n                             <div class=\"email-body dp-flex of-auto fd-column\" id=\"body-info-").concat(i + 1, "\">").concat(body, "</div>");
                    documentFragmentEmail.append(divEmail);
                    documentFragmentBody.append(divBody);
                }
                $emailList === null || $emailList === void 0 ? void 0 : $emailList.append(documentFragmentEmail);
                $containerWithInfo === null || $containerWithInfo === void 0 ? void 0 : $containerWithInfo.append(documentFragmentBody);
                return [2 /*return*/];
        }
    });
}); };
var removeHiddenFromBody = function (ev) {
    var _a, _b;
    var divToRemoveHidden = ev.target.classList[0];
    if (!($manualMessage === null || $manualMessage === void 0 ? void 0 : $manualMessage.validity.valueMissing)) {
        $manualMessage.value = "";
        $manualMessage.focus();
    }
    if (((_a = ev.target) === null || _a === void 0 ? void 0 : _a.textContent) == ((_b = $(".email-showing")) === null || _b === void 0 ? void 0 : _b.getAttribute('name'))) {
        toggleClasses($('.email-showing'), 'hidden', 'email-showing');
        $emptyContainer === null || $emptyContainer === void 0 ? void 0 : $emptyContainer.classList.remove('hidden');
        $containerWithInfo === null || $containerWithInfo === void 0 ? void 0 : $containerWithInfo.classList.add('hidden');
    }
    else if ($('.email-showing')) {
        toggleClasses($(".email-showing"), 'hidden', 'email-showing');
        toggleClasses($(".container-with-info .".concat(divToRemoveHidden)), 'email-showing', 'hidden');
    }
    else {
        toggleClasses($(".container-with-info .".concat(divToRemoveHidden)), 'email-showing', 'hidden');
    }
};
var toggleClasses = function (selector, classToAdd, classToRemove) {
    selector === null || selector === void 0 ? void 0 : selector.classList.add(classToAdd);
    selector === null || selector === void 0 ? void 0 : selector.classList.remove(classToRemove);
};
var autoMessageInputValidation = function () {
    if ($startFrom.validity.rangeOverflow ||
        parseInt($startFrom.value) >= (maxOverflow - 1)) {
        $startFrom.value = (maxOverflow - 1).toString();
    }
    else if ($startFrom.validity.rangeUnderflow ||
        parseInt($startFrom.value) <= 0) {
        $startFrom.value = maxUnderFlow.toString();
    }
    else if ($startFrom.validity.valueMissing) {
        $startFrom.value = maxUnderFlow.toString();
    }
    givingEndToProperties($startFrom.value);
};
var givingEndToProperties = function (value) {
    var correctSumn = parseInt(value);
    correctSumn = correctSumn + 1;
    $endTo.value = correctSumn.toString();
    $endTo.setAttribute('min', "".concat(correctSumn));
};
var showError = function (error) {
    $errorMessage.innerHTML = "<small>".concat(error, "</small>");
    setTimeout(function () { return $errorMessage.innerHTML = ""; }, 3000);
};
var validatingThreeFields = function () {
    return new Promise(function (resolve, reject) {
        if (!($startFromContainer.classList.contains('hidden') && $endToContainer.classList.contains('hidden'))) {
            if ($startFrom.validity.valueMissing || $startFrom.value == "") {
                reject("A value is needed at the start field in order to continue");
            }
            else if ($endTo.validity.valueMissing || $endTo.value == "") {
                reject('A value is needed at the end field in order to continue');
            }
            else if ($autoMessageToSend.validity.valueMissing || $autoMessageToSend.value == "") {
                reject('You need to write a message in order to continue!');
            }
        }
        else {
            if ($autoMessageToSend.validity.valueMissing || $autoMessageToSend.value == "") {
                reject('You need to write a message in order to continue!');
            }
        }
        resolve(true);
    });
};
var showConfirmAutoMessageInformation = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if ($selectAllMessages.checked == true) {
            $startFrom.value = maxUnderFlow.toString();
            $endTo.value = maxOverflow.toString();
        }
        $startSpan.innerHTML = $startFrom.value;
        $endSpan.innerHTML = $endTo.value;
        $autoMessageConfirm.innerHTML = $autoMessageToSend.value;
        return [2 /*return*/];
    });
}); };
var sendAutoMessageToEmails = function (information) { return __awaiter(_this, void 0, void 0, function () {
    var allChildrens, i, containerWhereAutoMessage;
    var _a, _b;
    return __generator(this, function (_c) {
        allChildrens = (_a = $(".container-with-info")) === null || _a === void 0 ? void 0 : _a.children;
        for (i = (information.start - 1); i <= information.end; i++) {
            containerWhereAutoMessage = (_b = allChildrens[i]) === null || _b === void 0 ? void 0 : _b.lastElementChild;
            if (containerWhereAutoMessage != null) {
                containerWhereAutoMessage.innerHTML += "<div class=\"response\">".concat(information.text, "</div>");
            }
        }
        return [2 /*return*/];
    });
}); };
$cancelAutoMessageBtn.addEventListener("click", function () { return $confirmAutoMessageContainer === null || $confirmAutoMessageContainer === void 0 ? void 0 : $confirmAutoMessageContainer.classList.add('hidden'); });
$openProgramMenu.addEventListener("click", function () { return $program.classList.remove('hidden'); });
$closeMenu.addEventListener("click", function () { return $program.classList.add("hidden"); });
$startFrom.addEventListener('click', function (ev) {
    var _a;
    if (!$startFrom.validity.valueMissing)
        $startFrom.value = (_a = ev.target) === null || _a === void 0 ? void 0 : _a.value;
});
$startFrom.addEventListener('change', function (ev) {
    if (!$startFrom.validity.valueMissing)
        autoMessageInputValidation();
});
$selectAllMessages.addEventListener('change', function () {
    $startFromContainer.classList.add('hidden');
    $endToContainer.classList.add('hidden');
});
$selectPersonalize.addEventListener('change', function () {
    $startFromContainer.classList.remove('hidden');
    $endToContainer.classList.remove('hidden');
});
$startFrom.addEventListener('mouseout', function (ev) {
    var _a;
    if (!$startFrom.validity.valueMissing) {
        $startFrom.value = (_a = ev.target) === null || _a === void 0 ? void 0 : _a.value;
    }
});
$endTo.addEventListener('change', function (ev) {
    if ($startFrom.validity.valueMissing) {
        autoMessageInputValidation();
    }
    else if (ev.target.value > maxOverflow) {
        ev.target.value = maxOverflow;
    }
});
$sendManualMessageBtn === null || $sendManualMessageBtn === void 0 ? void 0 : $sendManualMessageBtn.addEventListener("click", function (ev) {
    var _a;
    if ($manualMessage.value) {
        var containerWhereText = (_a = $(".email-showing")) === null || _a === void 0 ? void 0 : _a.lastElementChild;
        if (containerWhereText != null) {
            containerWhereText.innerHTML += "<div class=\"response\">".concat($manualMessage.value, "</div>");
        }
    }
    $manualMessage.focus();
});
$acceptAutoMessageBtn.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        validatingThreeFields()
            .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(response == true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, showConfirmAutoMessageInformation()];
                    case 1:
                        _a.sent();
                        $confirmAutoMessageContainer === null || $confirmAutoMessageContainer === void 0 ? void 0 : $confirmAutoMessageContainer.classList.remove('hidden');
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); })
            .catch(function (er) { return showError(er); });
        return [2 /*return*/];
    });
}); });
$confirmAutoMessageBtn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sendAutoMessageToEmails({
                    start: $startFrom.valueAsNumber,
                    end: $endTo.valueAsNumber,
                    text: $autoMessageToSend.value
                })];
            case 1:
                _a.sent();
                $program.classList.add('hidden');
                $confirmAutoMessageContainer.classList.add('hidden');
                return [2 /*return*/];
        }
    });
}); });
placeInfoInBothDivs();
