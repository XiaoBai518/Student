define(function(require,exports,module) {
    window.$ = window.jQuery = $ = require('jquery');
    var plugin = require("plugin");
    var CallBack = null;
    
    var MatrixType = '[矩阵题]';
    var singleMatrixType = '[矩阵单选题]';
    var LikertMatrixType = '[矩阵量表题]';
    var RevLikertMatrixType = '[矩阵反向量表题]';
    var TableType = '[表格题]';
    var SumType = '[比重题]';
    var SortType = '[排序题]';
    var LikertType = '[量表题]';
    var ReverseLikertType = '[反向量表题]';
    var LabelItem = '[标签]';
    var DesignLabelItem = '【标签】';
    var CutType = '[段落说明]';
    var PageType = '[分页栏]';
    var AllQType = '[题目]';
    var CheckQType = '[多选题]';
    var RadioQType = '[单选题]';
    var GapFillType = '[简答题]';
    var GapFillTest = '[填空题]';
    var CeShiQType = '[测试题]';
    var CeShiQCheckType = '[测试多选题]';
    var undefinedTermType = '[不定项题]';
    var label = '';
    var qType = '';
    var isCompact = false;
    var GenerateType = 1;
    var qIndex = 1;
    var itemValue = 0;
    var needExcute = false;
    var prevDigit = - 1;
    var prevMatrixDigit = - 1;
    var numPerNow = 1;
    var isNotClick = false;
    var total_page = 0;
    var tempDataNode = null;
    var curPos = 0;
    var lineCharCount = 2;
    var lineIndex = 0;
    var lines = null;
    var cutStartIndex = 0;
    var cutEndIndex = 0;
    var pageStartIndex = 0;
    var pageEndIndex = 0;
    var isEnglish = false;
    var prevChoiceD = 0;
    var choiceStartWithNumber = false;
    var GapFillStr = '______';
    var GapWidth = 21;
    var GapFillReplace = '<input style=\'width:' + GapWidth + 'px;\' />';
    var curChar = 0;
    var titleProcessed = false;
    var isDigitBig = false;
    var firstQuestion = null;
    var isKaoShi = 1;
    exports.bataddq = function(){
        var defValue="1、水可以直接变成油。(错) \n\n2、用1、3、5组成的所有的三位数,一定都是3的倍数。（对）[6分]\n\n3、违约责任具有的特点是（　B　） [单选题][6分]\nA.既包括合同订立阶段的缔约过失责任，也包括当事人没有履行合同义务的责任\nB.只能在合同当事人之间发生\nC.以制裁性为其基本目的\nD.只能由法律规定，不能由当事人约定\n\n4、当事人一方不履行合同义务或者履行合同义务不符合约定的，应当承担（　ABC　）等违约责任。[多选题]\nA.继续履行\nB.采取补救措施\nC.赔偿损失\nD.被强制解除合同\n\n5、请简述中国的法律史。[简答题]\n\n6、这是一道填空题，{第一空答案}，{第二空答案} [填空题][5分]\n\n";
    	$("#txtContent").val(defValue);
        $(document).on('click',"#txtContent",function(){
            var value = $(this).val().replace(/\r/gi, "");
            if (value == defValue){
            	$(this).val('');
            }
    	});
    	$(document).on('blur',"#txtContent",function(){
    		if (!$(this).val()) $(this).val(defValue);
    	});
    	$(document).on('click',"#cleartext",function(){
    		$("#txtContent").val('');
    	});
    };
	String.prototype.contains = function(a) {
		return this.indexOf(a) != -1;
	};
	String.prototype.endWith = function(a) {
		if (a == null || a == '' || this.length == 0 || a.length > this.length) {
			return false;
		}
		if (this.substring(this.length - a.length) == a) {
			return true;
		} else {
			return false;
		}
		return true;
	};
	String.prototype.startWith = function(a) {
		if (a == null || a == '' || this.length == 0 || a.length > this.length) {
			return false;
		}
		if (this.substr(0, a.length) == a) {
			return true;
		} else {
			return false;
		}
		return true;
	};
    exports.parseSubject = function(txtContentValue,callback){
    	if(txtContentValue == null){
    		txtContentValue = txtContent.value;
    	}
    	if(callback){
    		CallBack = callback;
    	}
    	if (!txtContentValue) {
    	    if(CallBack){
    	    	CallBack(false);
    	    }
    	    return;
    	}
    	  window.parent.batAddQTimes++;
    	  var A = txtContentValue;
    	  A = replace_specialChar(A);
    	  lines = A.split('\n');
    	  var ad = lines.length;
    	  var q;
    	  var k = false;
    	  var D = '';
    	  var m = '';
    	  var ac = '';
    	  for (lineIndex = 0; lineIndex < ad; lineIndex++) {
    	    q = lines[lineIndex];
    	    var J = lines[lineIndex + 1];
    	    var af = /^\s*([A-Za-z])[^A-Za-z0-9]/;
    	    var aD = true;
    	    if (IsBlank(q) && IsBlank(J)) {
    	      continue;
    	    }
    	    if (IsBlank(q) && J) {
    	      var aq = '';
    	      var v = J.match(af);
    	      if (v) {
    	        aq = v[1];
    	      }
    	      if (v && ac) {
    	        v = ac.match(af);
    	        if (v) {
    	          D = v[1];
    	        }
    	      }
    	      if ((aq == 'A' || aq == 'a') && D == '') {
    	        aD = false;
    	        D = aq;
    	        k = true;
    	      } else {
    	        if (D && aq && aq.charCodeAt(0) == D.charCodeAt(0) + 1) {
    	          aD = false;
    	          D = aq;
    	          k = true;
    	        }
    	      }
    	    }
    	    if (!IsBlank(q)) {
    	      ac = q;
    	    }
    	    if (aD) {
    	      m += q + '\n';
    	    }
    	  }
    	  if (k) {
    		txtContentValue = A = m;
    	    lines = A.split('\n');
    	    ad = lines.length;
    	  }
    	  var z = '';
    	  var ai = '';
    	  var ax = '';
    	  var H = false;
    	  var aB = true;
    	  var aw = false;
    	  var K = false;
    	  qType = 'question';
    	  isDigitBig = false;
    	  var l = /^\s*([一二三四五六七八九十][\.。、\x20\t．:：]|[（(][一二三四五六七八九十][)）]|第[一二三四五六七八九十])/g;
    	  var c = 0;
    	  titleProcessed = false;
    	  firstQuestion = null;
    	  lineIndex = 0;
    	  curChar = 0;
    	  for (lineIndex = 0; lineIndex < ad; lineIndex++) {
    	    q = lines[lineIndex];
    	    if (l.exec(q)) {
    	      c++;
    	    }
    	    if (c > 5) {
    	      isDigitBig = true;
    	      break;
    	    }
    	  }
    	  choiceStartWithNumber = false;
    	  prevChoiceD = 0;
    	  isCompact = false;
    	  var V = false;
    	  var U = false;
    	  var S = false;
    	  for (lineIndex = 0; lineIndex < ad; lineIndex++) {
    	    q = lines[lineIndex];
    	    if (IsBlank(q)) {
    	      continue;
    	    }
    	    if (StartWithDigit(q)) {
    	      isCompact = true;
    	      S = true;
    	    }
    	    break;
    	  }
    	  try {
    		var preLine = null;
    	    while (true) {
    	      if (lineIndex >= ad) {
    	        break;
    	      }
    	      q = trim(lines[lineIndex]);
    	      if (!titleProcessed) {
    	        if (!IsBlank(q)) {
    	          ax = q;
    	          qType = 'question';
    	          H = false;
    	          K = false;
    	          var re = new RegExp("^<(img)\\s*([\\w]*=(\"|\')([^\"\'<]*)(\"|\')\\s*)*(/>|>)$", "g");
    	          var r = ax.match(re);
    	          if(r!=null){//说明是一张图片
    	        	  titleProcessed = false;
    	        	  lineIndex++;
    	        	  preLine = q;
    	        	  continue;
    	          }else{
    	        	  if(preLine != null){
    	        		  ax = preLine + ax;
    	        	  }
    	        	  preLine = null;
    	          }
    	          if (ax.contains(MatrixType) || ax.contains(LikertMatrixType) || ax.contains(RevLikertMatrixType) || ax.contains(singleMatrixType)) {
    	            aB = true;
    	            qType = 'matrix';
    	          }else if (ax.contains(TableType)) {
    	              aB = true;
    	              aw = true;
    	              qType = 'matrix';
    	          } else if (ax.contains(SumType)) {
    	              qType = 'sum';
    	          } else if (ax.contains(SortType)) {
    	              qType = 'sort';
    	          } else if (ax.contains(LikertType) || ax.contains(ReverseLikertType)) {
    	              qType = 'likert';
    	          } else if (ax.contains(CheckQType) || ax.contains(CeShiQCheckType)) {
    	              qType = 'check';
    	          } else if(ax.contains(undefinedTermType)){
    	        	  qType = "undefinedtermcheck";
    	          } else if (ax.contains(RadioQType) || ax.contains(CeShiQType)) {
    	              qType = 'radio';
    	          } else if (ax.contains(PageType)) {
    	              qType = 'page';
    	              pageStartIndex = lineIndex + 1;
    	          } else if (ax.contains(GapFillType) || ax.contains(GapFillTest)) {
    	              qType = 'fill';
    	          } else if (ax.contains(CutType) || (isCompact && IsCut(ax))) {
    	              qType = 'cut';
    	              cutStartIndex = lineIndex + 1;
    	          }
    	          titleProcessed = true;
    	        }
    	        lineIndex++;
    	      }
    	      if (titleProcessed) {
    	        var o = lineIndex;
    	        var ay = 0;
    	        var F = false;
    	        var au = true;
    	        var an = false;
    	        z = '';
    	        var x = ax.contains(GapFillType) || ax.contains(GapFillTest);
    	        if (!x) {
    	          for (; o < ad; o++) {
    	            var ab = lines[o];
    	            if (isCompact) {
    	              prevIsNewQ = false;
    	              if (IsBlank(ab)) {
    	                choiceStartWithNumber = false;
    	                break;
    	              } else {
    	                if (isKaoShi && StartWithDigit(ab)) {
    	                  choiceStartWithNumber = false;
    	                  break;
    	                }
    	              }
    	              ay++;
    	            } else {
    	              if (IsBlank(ab)) {
    	                break;
    	              }
    	              ay++;
    	            }
    	          }
    	        }
    	        for (; lineIndex < o; lineIndex++) {
    	          var ab = trim(lines[lineIndex]);
    	          if (qType == 'cut' || qType == 'page') {
    	            z += lines[lineIndex];
    	            if (lineIndex < o - 1) {
    	              z += '<br/>';
    	            }
    	            cutEndIndex = lineIndex + 1;
    	            pageEndIndex = lineIndex + 1;
    	          } else {
    	            if (!IsBlank(ab)) {
    	              F = true;
    	              if (qType == 'matrix') {
    	                if (aB) {
    	                  var ag = '103';
    	                  if (aw) {
    	                    ag = '303';
    	                    itemValue = 0;
    	                  }
    	                  tempDataNode = AddMatrixTitle(ax, qIndex, ag);
    	                  qIndex++;
    	                  var at = ab.split(/(\x20|\t)+/gi);
    	                  for (var L = 0; L < at.length; L++) {
    	                    if (!isEmpty(trim(at[L]))) {
    	                      itemValue++;
    	                    }
    	                    AddSelectItem(tempDataNode, at[L]);
    	                  }
    	                  if (aw) {
    	                    for (var ar = 1; ar < tempDataNode._select.length; ar++) {
    	                      tempDataNode._select[ar]._item_value = ar;
    	                    }
    	                  }
    	                  aB = false;
    	                } else {
    	                  if (aw) {
    	                    var at = ab.split(/(\x20|\t)+/gi);
    	                    for (var L = 0; L < at.length; L++) {
    	                      AddColumn(tempDataNode, at[L]);
    	                    }
    	                    aw = false;
    	                  } else {
    	                    if (ab.startWith(LabelItem)) {
    	                      label = ab.substr(4);
    	                    } else {
    	                      AddMatrixLine(tempDataNode, ab);
    	                    }
    	                  }
    	                }
    	              } else {
    	                if (qType == 'sum') {
    	                  if (!K) {
    	                    tempDataNode = AddSumTitle(ax, qIndex);
    	                    qIndex++;
    	                    K = true;
    	                  }
    	                  if (K) {
    	                    if (ab.startWith(LabelItem)) {
    	                      label = ab.substr(4);
    	                    } else {
    	                      AddMatrixLine(tempDataNode, ab);
    	                    }
    	                  }
    	                } else {
    	                  if (qType != 'sort' && qType != 'likert' && qType != 'check' && qType != 'radio' && qType != 'undefinedtermcheck') {
    	                    qType = 'radio';
    	                    if (isCheck(ax)) {
    	                      qType = 'check';
    	                    }
    	                  }
    	                  var d = false;
    	                  if (!H) {
    	                    d = false;
    	                    if (!d) {
    	                      var an = ContainsAB(ab, lines, lineIndex, o);
    	                      if (an && !isKaoShi) {
    	                        var r = ab.toUpperCase();
    	                        for (curChar = 65; curChar < 90; curChar++) {
    	                          var R = String.fromCharCode(curChar);
    	                          var ah = String.fromCharCode(curChar + 1);
    	                          var G = r.indexOf(R);
    	                          var C = r.indexOf(ah);
    	                          if (G > - 1 && C > - 1) {
    	                            numPerNow++;
    	                          } else {
    	                            break;
    	                          }
    	                        }
    	                      } else {
    	                        if (ay == 1 && isCompact && !isEnglish && !isKaoShi) {
    	                          var am = /□|○|①|②|③|④|⑤|⑥|⑦|⑧/gi;
    	                          var at = ab.split(am);
    	                          if (at.length >= 3) {
    	                            numPerNow = at.length - 1;
    	                          } else {
    	                            var at = ab.split(/(\d\d?\.|\d\d?、|\(\d\d?\)|（\d\d?）)/gi);
    	                            if (at.length < 4) {
    	                              at = ab.split(/(\x20|\t)+/gi);
    	                            }
    	                            if (at.length < 3) {
    	                              if (ax.contains(RadioQType) || 
    	                            	  ax.contains(CeShiQType) || 
    	                            	  ax.contains(CeShiQCheckType) || 
    	                            	  ax.contains(undefinedTermType)) {
    	                            	  numPerNow = 6;
    	                              } else {
    	                            	  qType = 'question';
    	                            	  F = false;
    	                            	  break;
    	                              }
    	                            } else {
    	                              numPerNow = (at.length + 1) / 2;
    	                            }
    	                          }
    	                        }
    	                      }
    	                      tempDataNode = AddSelectTitle(ax, qIndex, qType);
    	                    }
    	                    itemValue = 0;
    	                    qIndex++;
    	                    H = true;
    	                  }
    	                  if (H && !d) {
    	                    if (ab.startWith(LabelItem)) {
    	                      label = ab.substr(4);
    	                    } else {
    	                      if (qType == 'radio' || qType == 'likert') {
    	                        itemValue++;
    	                      }
    	                      var at = null;
    	                      var u = false;
    	                      if (isCompact) {
    	                        if (au) {
    	                          an = ContainsAB(ab, lines, lineIndex, o);
    	                          au = false;
    	                          curChar = 65;
    	                        }
    	                        if (an) {
    	                          var r = ab.toUpperCase();
    	                          var imgArr = r.match(/<IMG[^>]+>/g);
    	                          if(imgArr != null){
    	                        	  for(var i=0;i<imgArr.length;i++){
    	                        		  var imgStr = imgArr[i];
    	                        		  var repStr = "#$*"+i+"*$#";
    	                        		  r = r.replace(imgStr,repStr);
    	                        	  }
    	                          }
    	                          var I = null;
    	                          if (isKaoShi) {
    	                        	  I = r.match(/[A-Z]{2,}/gi);
    	                          }
    	                          if (I) {
    	                            for (var az = 0; az < I.length; az++) {
    	                              var Q = I[az].length;
    	                              var M = '';
    	                              for (var Y = 0; Y < Q; Y++) {
    	                                M += '*';
    	                              }
    	                              r = r.replace(I[az], M);
    	                            }
    	                          }
    	                          var f = '';
    	                          var n = 0;
    	                          for (; curChar < 90; curChar++) {
    	                            var R = String.fromCharCode(curChar);
    	                            var ah = String.fromCharCode(curChar + 1);
    	                            var B = String.fromCharCode(curChar - 1);
    	                            var subR1 = r.substring(0,2);
    	                            var G = subR1.indexOf(R);
    	                            var C = subR1.indexOf(ah);
    	                            var g = subR1.indexOf(B);
    	                            var E = r.indexOf('其它');
    	                            if (E == - 1) {
    	                              E = r.indexOf('其他');
    	                            }
    	                            if (C == - 1) {
    	                              ah = String.fromCharCode(curChar + 2);
    	                              var subR = r.substring(0,1);
    	                              C = subR.indexOf(ah);
    	                              if (C > - 1) {
    	                                curChar++;
    	                              }
    	                            }
    	                            if (G > - 1 && C > - 1) {
    	                              f = ab.substring(G, C);
    	                              AddSelectItem(tempDataNode, f);
    	                            } else {
    	                              if (G > - 1) {
    	                                f = ab.substring(G);
    	                                AddSelectItem(tempDataNode, f);
    	                              } else {
    	                                if (E > - 1 && g == - 1) {
    	                                  f = ab.substring(E);
    	                                  AddSelectItem(tempDataNode, f);
    	                                  break;
    	                                } else {
    	                                  break;
    	                                }
    	                              }
    	                            }
    	                          }
    	                          if (isKaoShi && !f) {
    	                            var w = ab.match(/(答案[：:])\s*(([A-Z][、..]{0,1})*)\s*/);
    	                            if (w && w[2]) {
    	                              AddSelectItem(tempDataNode, ab);
    	                            } else {
    	                              var Z = trim(ab).match(/^答?案?\s*解析[\:：\s]/);
    	                              if (Z) {
    	                                AddSelectItem(tempDataNode, ab);
    	                              }
    	                            }
    	                          }
    	                          u = true;
    	                        } else {
    	                          if (!isEnglish && !isKaoShi) {
    	                            var am = /(□|○|①|②|③|④|⑤|⑥|⑦|⑧)/gi;
    	                            at = ab.split(am);
    	                            var h = false;
    	                            var t = 1;
    	                            if (at.length < 4) {
    	                              at = ab.split(/(\d\d?\.|\d\d?、|\(\d\d?\)|（\d\d?）)/gi);
    	                              if (at.length < 4) {
    	                                at = ab.split(/(\x20|\t)+/gi);
    	                                h = true;
    	                                t = 0;
    	                              }
    	                            }
    	                            if (at.length > 1) {
    	                              u = true;
    	                              for (var L = t; L < at.length; L++) {
    	                                if (h) {
    	                                  AddSelectItem(tempDataNode, at[L]);
    	                                } else {
    	                                  AddSelectItem(tempDataNode, at[L] + at[L + 1]);
    	                                  L++;
    	                                }
    	                              }
    	                            }
    	                          }
    	                        }
    	                      }
    	                      if (!u) {
    	                        AddSelectItem(tempDataNode, ab);
    	                      }
    	                    }
    	                  }
    	                }
    	              }
    	            }
    	          }
    	        }
    	        if (F) {
    	          tempDataNode._endLine = lineIndex;
    	          if (ax.contains(LikertType) || ax.contains(ReverseLikertType) || ax.contains(LikertMatrixType) || ax.contains(RevLikertMatrixType)) {
    	            var ae = ax.contains(RevLikertMatrixType) || ax.contains(ReverseLikertType);
    	            var ak = 1;
    	            if (ae) {
    	              ak = tempDataNode._select.length - 1;
    	            }
    	            for (var ar = 1; ar < tempDataNode._select.length; ar++) {
    	              tempDataNode._select[ar]._item_value = ak;
    	              if (ae) {
    	                ak--;
    	              } else {
    	                ak++;
    	              }
    	            }
    	          } else {
    	            if (ax.contains(CeShiQType) || 
    	            	ax.contains(CeShiQCheckType) ||
    	            	ax.contains(undefinedTermType) || 
    	            	isKaoShi) {
    	              tempDataNode._hasvalue = true;
    	              tempDataNode._isCeShi = true;
    	              tempDataNode._ceshiDesc = '';
    	              tempDataNode._ceshiValue = 5;
    	              var T = /\,\s*\[\s*(\d+)秒\]\s*$/;
    	              var al = tempDataNode._title.match(T);
    	              if (al && al[1]) {
    	                tempDataNode._title = tempDataNode._title.replace(T, '');
    	              }
    	              var O = /[\(（\[]?\s*(\d+\.?\d*)分[\)）\]]?\s*$/;
    	              al = tempDataNode._title.match(O);
    	              if (al && al[1]) {
    	                tempDataNode._ceshiValue = parseFloat(al[1]) || 5;
    	                tempDataNode._title = tempDataNode._title.replace(O, '');
    	              }
    	              var aA = /[\(（]\s*(答案[：:])?\s*(([A-Z][、..]{0,1})*)\s*[\)）]/;
    	              var av = false;
    	              var aC = tempDataNode._title.match(aA);
    	              var ap = false;
    	              var aj = tempDataNode._select.length;
    	              if (aC && aC[2]) {
    	                var aE = aC[2];
    	                for (var ar = 1; ar < aj; ar++) {
    	                  var y = trim(tempDataNode._select[ar]._item_title);
    	                  for (var N = 0; N < aE.length; N++) {
    	                    if (y.startWith(aE[N])) {
    	                      tempDataNode._select[ar]._item_radio = true;
    	                      av = true;
    	                      ap = true;
    	                      break;
    	                    }
    	                  }
    	                }
    	                if(av==false && ap==false){
    	                	if(tempDataNode._type == "radio" || 
    	                	   tempDataNode._type == "check" || 
    	                	   tempDataNode._type == "undefinedtermcheck"){
    	    	                for (var ar = 1; ar < aj; ar++) {
    	      	                  for (var N = 0; N < aE.length; N++) {
    	      	                    var aEn = aE[N];
    	      	                	if(/[A-Z]/.test(aEn)){
    	      	                	}else{
    	      	                		aEn = aEn.toUpperCase();
    	      	                	}
    	      	                	var aEAssicIndex = aEn.charCodeAt() - 64;
    	      	                    if (aEAssicIndex == ar){
			      	                      tempDataNode._select[ar]._item_radio = true;
			      	                      av = true;
			      	                      ap = true;
			      	                      break;
    	      	                    }
    	      	                  }
    	      	                }
    	                	}
    	                }
    	                if (!av && aE.length == 1 && (aE[0] == 'B' || aE[0] == 'A') && tempDataNode._select.length == 3) {
    	                  av = true;
    	                  var b = 1;
    	                  ap = true;
    	                  if (aE[0] == 'B') {
    	                    b = 2;
    	                  }
    	                  tempDataNode._select[b]._item_radio = true;
    	                }
    	                if(tempDataNode._type != "undefinedtermcheck"){
        	                if (aE.length > 1) {
        	                	tempDataNode._type = 'check';
        	                }
    	                }
    	              } else {
    	                var X = 0;
    	                for (var ar = 1; ar < tempDataNode._select.length; ar++) {
    	                  var y = trim(tempDataNode._select[ar]._item_title);
    	                  if (y.contains('（正确答案）') || y.contains('(正确答案)')) {
    	                    tempDataNode._select[ar]._item_radio = true;
    	                    X++;
    	                    tempDataNode._select[ar]._item_title = y.replace('（正确答案）', '').replace('(正确答案)', '');
    	                    av = true;
    	                  }
    	                }
    	                if(tempDataNode._type != "undefinedtermcheck"){
        	                if (X > 1 && tempDataNode._type == 'radio') {
        	                	tempDataNode._type = 'check';
        	                }
    	                }
    	              }
    	              var isJude = false;
    	              if (aj > 2) {
    	                var p = /^答?案?\s*解析[\:：\s]/;
    	                var W = trim(tempDataNode._select[aj - 1]._item_title);
    	                var aa = tempDataNode._select[aj - 2]._item_title;
    	                var ao = false;
    	                if (y.match(p)) {
    	                  tempDataNode._ceshiDesc = W.replace(p, '');
    	                  tempDataNode._select.pop();
    	                  ao = true;
    	                }
    	                var i = /(答案[：:])\s*(([A-Z][、..]{0,1})*)\s*/;
    	                var aC = null;
    	                if (ao && aa != undefined) {
    	                  aC = aa.match(i);
    	                } else {
    	                  aC = W.match(i);
    	                }
    	                if (aC && aC[2]) {
    	                  tempDataNode._select.pop();
    	                  if (!av) {
    	                    var aE = aC[2];
    	                    for (var ar = 1; ar < tempDataNode._select.length; ar++) {
    	                      var y = trim(tempDataNode._select[ar]._item_title);
    	                      for (var N = 0; N < aE.length; N++) {
    	                        if (y.startWith(aE[N])) {
    	                          tempDataNode._select[ar]._item_radio = true;
    	                          av = true;
    	                          break;
    	                        }
    	                      }
    	                    }
    	                    if (!av && aE.length == 1 && (aE[0] == 'B' || aE[0] == 'A') && tempDataNode._select.length == 3) {
    	                      av = true;
    	                      var b = 1;
    	                      if (aE[0] == 'B') {
    	                        b = 2;
    	                      }
    	                      tempDataNode._select[b]._item_radio = true;
    	                    }
    	                    if(tempDataNode._type != "undefinedtermcheck"){
        	                    if (aE.length > 1) {
          	                      	tempDataNode._type = 'check';
          	                    }
    	                    }
    	                  }
    	                }
    	              }else if(aj == 2){
    	            	  var i = /(答案[：:])\s*([正确|错误|对|错|√|×]+)\s*/;
    	            	  var W = trim(tempDataNode._select[1]._item_title);
    	            	  var aC = W.match(i);
	  	                  if (aC && aC[2]) {
	  	                	  isJude = true;
	  	                	  var f = true;
	  	                	  if(aC[2].contains("正确")||aC[2].contains("对")||aC[2].contains("√")){
	  	                		  f = true;
	  	                	  }else{
	  	                		  f = false;
	  	                	  }
	  	                	  var e = new Object();
			  	  			  e._item_title = '对';
			  	  			  e._item_radio = f;
			  	  			  e._item_value = '';
			  	  			  tempDataNode._select[1] = e;
	  	                	  var e1 = new Object();
			  	  			  e1._item_title = '错';
			  	  			  e1._item_radio = !f;
			  	  			  e1._item_value = '';
			  	  			  tempDataNode._select.push(e1);
	  	                	  tempDataNode._type = 'jude';
	  	                  }
    	              }
    	              if(isJude == false){
        	              if (!av) {
        	            	  tempDataNode._select[1]._item_radio = true;
        	              } else {
        	                if (ap) {
        	                  tempDataNode._title = tempDataNode._title.replace(aA, '（）');
        	                }
        	              }  
    	              }
    	            }
    	          }
    	          if (tempDataNode._select && tempDataNode._numperrow >= tempDataNode._select.length) {
    	            tempDataNode._numperrow = tempDataNode._select.length - 1;
    	          }
    	          createQ(tempDataNode);
    	          tempDataNode = null;
    	        } else {
    	          if (qType == 'cut' || qType == 'page') {
    	            if (!isEmpty(z)) {
    	              z = ax + '<br/>' + z;
    	            } else {
    	              z = ax;
    	            }
    	            if (qType == 'cut') {
    	              tempDataNode = AddCut(z);
    	            } else {
    	              tempDataNode = AddPage(z);
    	            }
    	            createQ(tempDataNode);
    	          } else {
    	            if (qType == 'question' || qType == 'fill') {
    	              if (ay == 1) {
    	                for (; lineIndex < o; lineIndex++) {
    	                  var ab = lines[lineIndex];
    	                  if (!IsBlank(ab)) {
    	                    ax += ab;
    	                  }
    	                }
    	              }
    	              tempDataNode = AddQuestion(ax, qIndex);
    	              createQ(tempDataNode);
    	              qIndex++;
    	            }
    	          }
    	        }
    	        titleProcessed = false;
    	      }
    	    }
    	    txtContentValue = '';
    	    if (S && window.parent.batAddQTimes == 1) {
    	      var s = window.parent.document.getElementById('chkUseSelfTopic');
    	      if (s.length >0 &&!s.checked) {
    	        s.checked = true;
    	        s.onclick();
    	      }
    	    }
    	    //window.parent.PDF_close();
    	  } catch (P) {
    		if(CallBack){
    			CallBack(false,99);
    		}
    	    return;
    	}
    }
    
    function clearTxt() {
		if (confirm('确认清空文本框内容吗？')) {
			txtContent.value = '';
		}
	}
	function trim(a) {
		if (a && a.replace) {
			return a.replace(/(^[\s\u3000]*)|([\s\u3000]*$)/g, '');
		} else {
			return a;
		}
	}
	function toInt(a) {
		return parseInt(trim(a));
	}
	function isEmpty(a) {
		return trim(a) == '';
	}
	function isInt(a) {
		var b = /^-?[0-9]+$/;
		return b.test(a);
	}
	function SBCCaseToNumberic(c) {
		var a = '';
		for ( var b = 0; b < c.length; b++) {
			if (c.charCodeAt(b) == 12288) {
				a += String.fromCharCode(c.charCodeAt(b) - 12256);
				continue;
			}
			if (c.charCodeAt(b) > 65280 && c.charCodeAt(b) < 65375) {
				a += String.fromCharCode(c.charCodeAt(b) - 65248);
			} else {
				a += String.fromCharCode(c.charCodeAt(b));
			}
		}
		return a;
	}
	function DBC2SBC(contentValue) {
		var e = contentValue;
		var a;
		if (e.length <= 0) {
			return false;
		}
		qstr1 = 'ＡＢＣＤＥＦＧＨＩＪＫＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｍｎｏｐｑｒｓｔｕｖｗｘｙｚ１２３４５６７８９０［］（）';
		bstr1 = 'ABCDEFGHIJKMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz1234567890[]()';
		var d = false;
		for (a = 0; a < e.length; a++) {
			var f = e.charAt(a);
			if (qstr1.indexOf(f) != -1) {
				e = e.replace(f, bstr1.charAt(qstr1.indexOf(f)));
				d = true;
			}
		}
		if (d) {
			return e;
		}
		return contentValue;
	}
	function checkEnglish(txtContentValue) {
		if(txtContentValue == null) return "";
		var d = txtContentValue.replace(/\n|\r/gi, ' ');
		var b = d.match(/[a-z]+[\s\?\,\.]/gi);
		var c = 0;
		if (b) {
			c = b.length + 1;
		}
		var a = 0;
		b = d.match(/[\u4e00-\u9fa5]/gi);
		if (b) {
			a = b.length + 1;
		}
		var e = document.getElementById('divEnglish');
		if (c > a) {
			if(e.length>0){
				e.style.display = '';	
			}
			isEnglish = true;
			cbEnglish.checked = true;
		}
	}
	function GetStartDigit(a) {
		a = trim(a);
		var c = /^\s*([a-zA-Z]|问题|第)?\s*\d+|\(\d\)+|[\uFF10-\uFF19]+|（[\uFF10-\uFF19]+）/g;
		var f = -1;
		var b = c.exec(a);
		if (b) {
			var e = b[0];
			if (e.length > 1
					&& ((e.charAt(0) >= 'a' && e.charAt(0) <= 'z') || (e
							.charAt(0) >= 'A' && e.charAt(0) <= 'Z'))) {
				e = e.substr(1);
			}
			e = e.replace(/第\s*/, '').replace(/问题\s*/, '');
			var d = SBCCaseToNumberic(e);
			if (!isInt(d)) {
				f = -1;
			} else {
				f = toInt(d);
			}
		}
		if (isDigitBig) {
			c = /^\s*([一二三四五六七八九十]{1,3})/g;
			b = c.exec(a);
			if (b) {
				return ChineseNumberToArabicNumber(b[0]);
			}
		}
		return f;
	}
	function StartWithDigit(j) {
		var d = GetStartDigit(j);
		if (d == -1) {
			return IsSample(j);
		}
		if(d>=1){
			return true;
		}
		if (d >= 100000) {
			return false;
		}
		var a = /^\s*\d+\s*[-－—~～]{1,3}\s*\d+/g;
		if (a.test(j) || /^\s*\d+[次万%千小年以岁元人本个后级GXM分]/.test(j)) {
			return false;
		}
		if (d == prevDigit + 1 && !choiceStartWithNumber) {
			prevDigit = d;
			choiceStartWithNumber = false;
			return true;
		}
		if (prevDigit == -1) {
			prevDigit = d;
		}
		a = /\d[\.、]|\(?\d\)|（?\d）/g;
		var e = j.match(a);
		if (e && e.length >= 2) {
			var b = true;
			for ( var c = 0; c < e.length; c++) {
				var g = e[c];
				var h = toInt(g);
				if (prevChoiceD != 0) {
					var f = h - prevChoiceD;
					if (f == 0 || h / f - prevChoiceD / f != 1) {
						b = false;
					}
				}
				prevChoiceD = h;
			}
			if (b) {
				return false;
			} else {
				prevChoiceD = 0;
			}
		}
		if (titleProcessed && qType != 'cut' && d == 1) {
			choiceStartWithNumber = true;
		}
		if (choiceStartWithNumber) {
			return false;
		}
		return true;
	}
	function ChineseNumberToArabicNumber(a) {
		var d = /(^[一二三四五六七八九十]$)|(^十[一二三四五六七八九]$)|(^[二三四五六七八九]十?[一二三四五六七八九]{0,1}$)/;
		if (!d.exec(a)) {
			return -1;
		}
		var b = -1;
		var c = '';
		var g = '一二三四五六七八九十';
		var f = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
		var e = a.length;
		switch (e) {
		case 1:
			b = f[g.indexOf(a)];
			break;
		case 2:
			if (a[0] != '十') {
				c = f[g.indexOf(a[0])] + '';
				if (a[1] == '十') {
					c += '0';
				} else {
					c += f[g.indexOf(a[1])];
				}
				b = toInt(c);
			} else {
				c = '1';
				c += f[g.indexOf(a[1])];
				b = toInt(c);
			}
			break;
		case 3:
			c = f[g.indexOf(a[0])] + '';
			c += f[g.indexOf(a[2])] + '';
			b = toInt(c);
			break;
		default:
			break;
		}
		return b;
	}
	function StartWithQType(a) {
		if (a.contains(MatrixType) || a.contains(LikertMatrixType)
				|| a.contains(RevLikertMatrixType) || a.contains(singleMatrixType)
				|| a.contains(SumType) || a.contains(RadioQType)
				|| a.contains(CeShiQType) || a.contains(CeShiQCheckType) 
				|| a.contains(undefinedTermType)
				|| a.contains(SortType) || a.contains(TableType)
				|| a.contains(GapFillType) || a.contains(GapFillTest)
				|| a.contains(LikertType) || a.contains(ReverseLikertType)
				|| a.contains(CutType) || a.contains(PageType) || IsCut(a)) {
			return true;
		}
		if (a.contains(AllQType)) {
			return true;
		}
		return false;
	}
	function IsCut(a) {
		a = trim(a);
		var b = /^\s*(基本信息|个人信息)/g;
		if (b.exec(a)) {
			return true;
		}
		if (isDigitBig) {
			return false;
		}
		b = /^\s*【?([一二三四五六七八九][\.。、\x20\t．:：]|[（(][一二三四五六七八九][)）]|第[一二三四五六七八九])/g;
		if (b.exec(a)) {
			var c = a.match(/[一二三四五六七八九]/g).length;
			if (c > 2) {
				return false;
			}
			return true;
		}
		return false;
	}
	
	function IsSample(a) {
		return false;
	}
	function IsBlank(a) {
		if (a == undefined) {
			return false;
		}
		var b = /^(\-|=|_)+$/g;
		a = trim(a);
		if (b.exec(a)) {
			return true;
		}
		if (!isEmpty(a) && a != '\n') {
			return false;
		}
		return true;
	}
	function IsNumber(a) {
		if (a == '0' || a == '1' || a == '2' || a == '3' || a == '4'
				|| a == '5' || a == '6' || a == '7' || a == '8' || a == '9') {
			return true;
		} else {
			return false;
		}
	}
	function isCheck(a) {
		if (a.contains('单选')) {
			return false;
		}
		if ((a.contains('多') || a.contains('复数') || a.contains('限')
				|| a.contains('最少') || a.contains('至少'))
				&& a.contains('选')) {
			return true;
		}
		if (a.contains('哪些')) {
			return true;
		}
		return false;
	}
	function AddQuestion(d, g) {
		if (d.contains(GapFillStr) || d.match(/\{.*?\}/) || d.contains(GapFillTest)) {
			return AddGapFill(d, g);
		}
		var c = new Object();
		c._type = 'question';
		c._topic = g + '';
		
		var O = /[\(（\[]?\s*(\d+\.?\d*)分[\)）\]]?\s*$/;
        var al = d.match(O);
        if (al && al[1]) {
             c._ceshiValue = parseFloat(al[1]) || 5;
             d = d.replace(O, '');
        }else{
        	c._ceshiValue = 5;
        }
		if (d.contains(GapFillTest) || isKaoShi) {
			c._isCeShi = true;
			var b = /[\(（]?\s*([×错√对])\s*[\)）]?\s*$/;
			var a = d.match(b);
			if (a && a[1]) {
				var title = d.replace(b, '');
				title = ProcessTitle(title);
				c._type = 'jude';
				c._title = ProcessTitle(title);
				c._keyword = '';
				c._relation = '';
				c._hasvalue = true;
				c._ceshiDesc = '';
				c._hasjump = false;
				c._anytimejumpto = '0';
				c._requir = true;
				c._ins = '';
				c._randomChoice = false;
				c._verify = '';
				c._numperrow = 1;
				c._select = new Array();
				c._select.push(new Object());
				var f = a[1].contains('对') || a[1].contains('√');
				var e = new Object();
				e._item_title = '对';
				e._item_radio = f;
				e._item_value = '';
				c._select.push(e);
				e = new Object();
				e._item_title = '错';
				e._item_radio = !f;
				e._item_value = '';
				c._select.push(e);
				return c;
			}
		}
		c._title = ProcessTitle(d);
		c._height = 1;
		c._startLine = lineIndex;
		c._endLine = lineIndex;
		return c;
	}
	function getGapFillCount(b) {
		var d = 0;
		var e = 0;
		var a = b.length;
		var f = b.match(/(\{.*?\})/g);
		if (f) {
			return f.length;
		}
		do {
			e = b.indexOf(GapFillStr, e);
			if (e != -1) {
				d++;
				e += GapFillStr.length;
				for ( var c = e; c < a; c++) {
					if (b.charAt(c) != '_') {
						break;
					}
					e++;
				}
			}
		} while (e != -1);
		return d;
	}
	function replaceGapFill(l, b) {
		var d = 0;
		var a = 0;
		var g = new StringBuilder();
		var m = 0;
		do {
			a = d;
			d = l.indexOf(GapFillStr, d);
			var f = GapFillStr;
			if (d != -1) {
				var h = 0;
				g.append(l.substr(a, d - a));
				d += GapFillStr.length;
				for ( var c = d; c < l.length; c++) {
					if (l[c] != '_') {
						break;
					}
					h++;
					f += '_';
					d++;
				}
				var e = GapWidth + h * (GapWidth / 3);
				var k = false;
				if (b._rowVerify[m] && b._rowVerify[m]._verify == '日期') {
					e = 70;
					k = true;
				}
				var i = GapFillReplace.replace('width:' + GapWidth + 'px',
						'width:' + e + 'px');
				if (b._useTextBox) {
					i = i.replace('/>', ' class=\'inputtext\'/>');
				} else {
					i = i.replace('/>', ' class=\'underline\'/>');
				}
				g.append(i);
				m++;
			} else {
				if (a < l.length) {
					g.append(l.substr(a));
				}
			}
		} while (d != -1);
		return g.toString();
	}
	function AddGapFill(b, e) {
		var d = getGapFillCount(b);
		var a = new Object();
		a._type = 'gapfill';
		a._topic = e + '';
		a._verify = '';
		if (b.contains(GapFillTest) || isKaoShi) {
			a._isCeShi = true;
            var O = /[\(（\[]?\s*(\d+\.?\d*)分[\)）\]]?\s*$/;
            var al = b.match(O);
            if (al && al[1]) {
                 a._ceshiValue = parseFloat(al[1]) || 5;
                 b = b.replace(O, '');
            }else{
                 a._ceshiValue = 5;
            }
		}
		b = ProcessTitle(b);
		a._title = b;
		a._keyword = '';
		a._relation = '';
		a._tag = '';
		a._requir = true;
		a._gapcount = d;
		a._ins = '';
		a._hasjump = false;
		a._anytimejumpto = '0';
		a._useTextBox = false;
		a._rowVerify = new Array();
		if (isKaoShi) {
			var f = b.match(/\{(.*?)\}/g);
			if (f && f.length > 0) {
				for ( var c = 0; c < f.length; c++) {
					a._rowVerify[c] = new Object();
					a._rowVerify[c]._answer = trim(f[c].replace('{', '')
							.replace('}', ''));
					a._rowVerify[c]._ceshiValue = 1;
				}
				b = b.replace(/(\{.*?\})/g, '______');
				a._title = b;
			}
		}
		a._startLine = lineIndex;
		a._endLine = lineIndex;
		return a;
	}
	function AddSelectTitle(d, e, f) {
		var c = new Object();
		c._startLine = lineIndex;
		c._tag = '';
		if (f == 'sort') {
			c._type = 'check';
			c._tag = '1';
			d = d.replace(SortType, '');
		} else {
			if (f == 'likert') {
				c._type = 'radio';
				c._tag = '101';
				d = d.replace(LikertType, '');
				d = d.replace(ReverseLikertType, '');
			} else {
				c._type = f;
				d = d.replace(CeShiQType, '');
				d = d.replace(CeShiQCheckType, '');
			}
		}
		c._topic = e + '';
		if (f == 'check') {
			var a = /限选(\d)项/;
			var b = d.match(a);
			if (b && b[1] > 0) {
				c._lowLimit = b[1];
				c._upLimit = b[1];
				d = d.replace(a, '');
			}
			a = /最多选(\d)项/;
			b = d.match(a);
			if (b && b[1] > 0) {
				c._upLimit = b[1];
				c._lowLimit = '';
				d = d.replace(a, '');
			}
			a = /[最至]少选(\d)项/;
			b = d.match(a);
			if (b && b[1] > 0) {
				c._lowLimit = b[1];
				c._upLimit = '';
				d = d.replace(a, '');
			}
		}
		d = ProcessTitle(d);
		c._title = d;
		c._keyword = '';
		c._relation = '';
		if (f == 'likert') {
			c._hasvalue = true;
		} else {
			c._hasvalue = false;
		}
		c._hasjump = false;
		c._anytimejumpto = '0';
		c._requir = true;
		c._ins = '';
		c._randomChoice = false;
		c._verify = '';
		if (numPerNow >= 6) {
			numPerNow = numPerNow / 2;
		}
		if (d == '您的性别：' && numPerNow == 1) {
			c._verify = '性别';
			numPerNow = 6;
		}
		c._numperrow = numPerNow;
		numPerNow = 1;
		c._select = new Array();
		c._select.push(new Object());
		return c;
	}
	function AddSelectItem(b, a) {
		a = trim(a).replace('□', '');
		if (!IsBlank(a)) {
			var d = false;
			if (a.endWith(GapFillStr) || a.endWith(GapFillStr + ')')
					|| a.endWith(GapFillStr + '）')) {
				a = a.replace(/[_]/g, '');
				d = true;
			} else {
				if (a.contains('请注明') || a.contains('请说明')) {
					a = a.replace(/[(（]?(请注明|请说明|请填写)[)）]?/g, '');
					d = true;
				}
			}
			var c = new Object();
			c._item_title = a;
			c._item_radio = false;
			c._item_value = '';
			b._select.push(c);
		}
	}
	function AddColumn(b, a) {
		if (isEmpty(trim(a))) {
			return;
		}
		if (!b._columntitle) {
			b._columntitle = a;
		} else {
			b._columntitle += '\n' + a;
		}
	}
	function AddMatrixTitle(b, c, d) {
		var a = new Object();
		a._startLine = lineIndex;
		a._type = 'matrix';
		a._topic = c + '';
		a._keyword = '';
		a._relation = '';
		a._verify = '';
		if (b.contains(LikertMatrixType) || b.contains(RevLikertMatrixType)) {
			d = '101';
		}
		b = ProcessTitle(b);
		if (d == '303') {
			b = b.replace(TableType, '');
		} else {
			b = b.replace(MatrixType, '');
			b = b.replace(LikertMatrixType, '');
		    b = b.replace(RevLikertMatrixType, '');
		    b = b.replace(singleMatrixType, '');
		}
		a._tag = d;
		a._title = b;
		if (d == '303' || d == '101') {
			a._hasvalue = true;
		} else {
			a._hasvalue = false;
		}
		a._hasjump = false;
		a._anytimejumpto = '0';
		a._requir = true;
		a._ins = '';
		a._rowwidth = '';
		a._rowwidth2 = '';
		a._rowtitle = '';
		a._rowtitle2 = '';
		a._columntitle = '';
		a._select = new Array();
		a._select.push(new Object());
		return a;
	}
	function AddMatrixLine(b, a) {
		if (!IsBlank(a)) {
			if (!b._rowtitle) {
				b._rowtitle = '';
			}
			if (b._rowtitle) {
				b._rowtitle += '\n';
			}
			if (!isEmpty(label)) {
				b._rowtitle += DesignLabelItem + label + '\n';
				label = '';
			}
			b._rowtitle += a;
		}
	}
	function AddSumTitle(b, c) {
		var a = new Object();
		a._startLine = lineIndex;
		a._verify = '';
		a._type = 'sum';
		a._topic = c + '';
		a._keyword = '';
		a._relation = '';
		b = ProcessTitle(b);
		b = b.replace(SumType, '');
		a._title = b;
		a._tag = '';
		a._hasjump = false;
		a._anytimejumpto = '0';
		a._requir = true;
		a._ins = '';
		a._rowwidth = 100;
		a._total = 100;
		return a;
	}
	function ContainsAB(a, k, j, h) {
		if (isEnglish) {
			return false;
		}
		var i = a.toUpperCase();
		var c = i.indexOf('A');
		var g = false;
		var f = false;
		if (c > -1) {
			g = true;
			if (c + 1 < i.length && i.charAt(c + 1) >= 'A'
					&& i.charAt(c + 1) <= 'Z') {
				g = false;
			}
		}
		var e = false;
		var d = g;
		if (d) {
			c = i.indexOf('B');
			if (c > -1) {
				f = true;
				var nextChar = i.charAt(c + 1);
				while(c + 1 < i.length && nextChar >= 'A' && nextChar <= 'Z') {
					c++;
					c = i.indexOf('B',c);
					if(c == -1){
						f = false;
						break;
					}
					nextChar = i.charAt(c + 1);
				}
				if((c + 1)>=i.length){
					f = false;
				}
			}
			if (!f && j + 1 < h) {
				var b = k[j + 1].toUpperCase();
				c = b.indexOf('B');
				if (c > -1) {
					f = true;
					if (c + 1 < b.length && b.charAt(c + 1) >= 'A'
							&& b.charAt(c + 1) <= 'Z') {
						f = false;
					}
				}
			}
			if (f) {
				e = true;
			}
		}
		return e;
	}
	function replace_specialChar(a) {
		return a.replace(/(§)/g, 'ξ').replace(/(¤)/g, '○').replace(/(〒)/g, '╤');
	}
	function regsplit(f, d) {
		var e = f.split(d), c = f.match(d), a = [ e[0] ];
		if (!c) {
			return a;
		}
		for ( var b = 0; b < c.length; ++b) {
			a[2 * b + 1] = c[b];
			a[2 * b + 2] = e[b + 1];
		}
		return a;
	}
	function ProcessTitleItems(d) {
		if (isEnglish) {
			return false;
		}
		var e = false;
		var f = null;
		var o = d.toUpperCase();
		var a = d;
		var c = 'radio';
		if (isCheck(d)) {
			c = 'check';
		}
		var b = o.indexOf('A');
		var k = false;
		var i = false;
		if (b > -1) {
			k = true;
			if (b + 1 < o.length && o.charAt(b + 1) > 'A'
					&& o.charAt(b + 1) < 'Z') {
				k = false;
			}
		}
		b = o.indexOf('B');
		if (b > -1) {
			i = true;
			if (b + 1 < o.length && o.charAt(b + 1) > 'A'
					&& o.charAt(b + 1) < 'Z') {
				i = false;
			}
		}
		var h = k && i && !o.contains('AB');
		if (h && !isKaoShi) {
			f = regsplit(d, /[A-Z][^A-Z]/gi);
			a = f[0];
			e = true;
			numPerNow = (f.length - 1) / 2;
			tempDataNode = AddSelectTitle(a, qIndex, c);
			for ( var g = 1; g < f.length; g += 2) {
				var l = f[g] + f[g + 1];
				AddSelectItem(tempDataNode, l);
			}
		} else {
			var n = /□|○|①|②|③|④|⑤|⑥|⑦|⑧/gi;
			f = d.split(n);
			if (f.length >= 3) {
				numPerNow = f.length - 1;
				var m = a.search(n);
				a = a.substr(0, m);
				tempDataNode = AddSelectTitle(a, qIndex, c);
				for ( var g = 1; g < f.length; g += 1) {
					var l = f[g];
					if (!isEmpty(l)) {
						AddSelectItem(tempDataNode, l);
					}
				}
				e = true;
			}
		}
		return e;
	}
	//处理的题目的选项
	function ProcessOptionTitle(a){
		if(a == null || a == "") return a;
		if(a.length < 2) return a;
		var firstChat = a.charAt(0);
		var regExp = /[a-z]|[A-Z]$/;
		if(!regExp.test(firstChat)){
			return a;
		}
		var secondChar = a.charAt(1);
		if (secondChar == '.' || secondChar == '。' || secondChar == '、' || secondChar == ' ' || secondChar == '．') {
			return a.substr(2);
		}
		return a;
	}
	//处理题目的题干
	function ProcessTitle(a) {
		var d = 0;
		a = a.replace('[单选题]', '');
		a = a.replace('[填空题]', '');
		a = a.replace('[判断题]', '');
		a = a.replace('[复选题]', '');
		a = a.replace('[多选题]', '');
		a = a.replace('[主观题]', '');
		a = a.replace('[简答题]', '');
		a = a.replace('[必答题]', '');
		a = a.replace('(可多选)', '');
		a = a.replace('[排序题]', '');
		a = a.replace('(多选)', '');
		a = a.replace('[矩阵题]', '');
		a = a.replace(undefinedTermType, '');
		a = a.replace(singleMatrixType, '');
		a = a.replace('[段落说明]','');
		a = a.replace('[表格题]', '');
		a = a.replace('[比重题]', '');
		a = a.replace('[分页栏]', '');
		a = a.replace(AllQType, '');
		a = a.replace('[测试填空题]','');
		
        if (IsNumber(a.charAt(0))) {
			if (!StartWithDigit(a)) {
				return a;
			}
			d++;
			for ( var b = 1; b < a.length; b++) {
				if (IsNumber(a.charAt(b))) {
					d++;
				} else {
					var e = a.charAt(b);
					if (e == '.' || e == '。' || e == '、' || e == ' '
							|| e == '．') {
						d++;
					} else {
						break;
					}
				}
			}
			return a.substr(d);
		} else {
			return a;
		}

	}
	
	var hasInsert = false;
	function createQ(a) {
		//开始添加题目
		if(a._type == "radio" || a._type == "check" || a._type == "undefinedtermcheck"){
			$.each(a._select, function(i, item) {
				item._item_title = ProcessOptionTitle(item._item_title);
			});
		}
		if(CallBack){
			CallBack(a);
		}
	}
})
