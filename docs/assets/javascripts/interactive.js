/**
 * 文化遗产保护与利用 - 交互模块 v2
 * 包含：阅读进度条、图片对比器、时间线、术语提示、Tab切换、回到顶部
 */
(function() {
  'use strict';

  // ============================================================
  //  1. 阅读进度条
  // ============================================================
  function initReadingProgress() {
    var bar = document.createElement('div');
    bar.className = 'reading-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.prepend(bar);

    function updateProgress() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      bar.style.width = progress + '%';
    }

    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    updateProgress();
  }

  // ============================================================
  //  2. 图片对比器 (Before/After)
  // ============================================================
  function initImgCompare() {
    var containers = document.querySelectorAll('.img-compare');
    containers.forEach(function(container) {
      var beforeDiv = container.querySelector('.img-before');
      var handle = container.querySelector('.slider-handle');
      if (!beforeDiv || !handle) return;

      var isDragging = false;

      function setPosition(x) {
        var rect = container.getBoundingClientRect();
        var pos = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
        var pct = pos * 100;
        beforeDiv.style.width = pct + '%';
        handle.style.left = pct + '%';
      }

      function onStart(e) {
        e.preventDefault();
        isDragging = true;
        container.style.cursor = 'col-resize';
      }

      function onMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        var x = e.touches ? e.touches[0].clientX : e.clientX;
        setPosition(x);
      }

      function onEnd() {
        isDragging = false;
        container.style.cursor = 'col-resize';
      }

      container.addEventListener('mousedown', onStart);
      container.addEventListener('touchstart', onStart, { passive: false });
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchend', onEnd);

      // Click to set position
      container.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
          setPosition(e.clientX);
        }
      });
    });
  }

  // ============================================================
  //  3. 时间线交互（点击展开详情）
  // ============================================================
  function initTimeline() {
    var items = document.querySelectorAll('.timeline-item');
    items.forEach(function(item) {
      var detail = item.querySelector('.timeline-detail');
      if (!detail) return;

      item.addEventListener('click', function() {
        var wasExpanded = item.classList.contains('expanded');
        // Close all others
        items.forEach(function(other) {
          other.classList.remove('expanded');
        });
        // Toggle current
        if (!wasExpanded) {
          item.classList.add('expanded');
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }

  // ============================================================
  //  4. Tab 切换器
  // ============================================================
  function initTabs() {
    var containers = document.querySelectorAll('.tab-container');
    containers.forEach(function(container) {
      var buttons = container.querySelectorAll('.tab-btn');
      var panels = container.querySelectorAll('.tab-panel');

      buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var targetId = btn.getAttribute('data-tab');

          buttons.forEach(function(b) { b.classList.remove('active'); });
          panels.forEach(function(p) { p.classList.remove('active'); });

          btn.classList.add('active');
          var target = container.querySelector('.tab-panel[data-tab="' + targetId + '"]');
          if (target) {
            target.classList.add('active');
          }
        });
      });
    });
  }

  // ============================================================
  //  5. 术语提示 (Glossary Tooltip)
  // ============================================================
  function initGlossary() {
    var tooltip = document.createElement('div');
    tooltip.className = 'glossary-tooltip';
    tooltip.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tooltip);

    var terms = document.querySelectorAll('.glossary-term');
    var currentTerm = null;
    var hideTimer = null;

    terms.forEach(function(term) {
      term.addEventListener('mouseenter', function(e) {
        clearTimeout(hideTimer);
        currentTerm = term;

        var title = term.getAttribute('data-title') || term.textContent;
        var desc = term.getAttribute('data-desc') || '';

        tooltip.innerHTML = '<h5>' + title + '</h5><p>' + desc + '</p>';
        tooltip.classList.add('visible');

        positionTooltip(e);
      });

      term.addEventListener('mousemove', function(e) {
        positionTooltip(e);
      });

      term.addEventListener('mouseleave', function() {
        hideTimer = setTimeout(function() {
          tooltip.classList.remove('visible');
          currentTerm = null;
        }, 200);
      });
    });

    tooltip.addEventListener('mouseenter', function() {
      clearTimeout(hideTimer);
    });

    tooltip.addEventListener('mouseleave', function() {
      tooltip.classList.remove('visible');
      currentTerm = null;
    });

    function positionTooltip(e) {
      var x = e.clientX;
      var y = e.clientY;
      var tw = tooltip.offsetWidth;
      var th = tooltip.offsetHeight;
      var margin = 16;

      // Keep tooltip in viewport
      if (x + tw + margin > window.innerWidth) {
        x = window.innerWidth - tw - margin;
      }
      if (y + th + margin > window.innerHeight) {
        y = y - th - margin;
      } else {
        y = y + margin;
      }

      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    }
  }

  // ============================================================
  //  6. 回到顶部按钮
  // ============================================================
  function initBackToTop() {
    var btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '&#8593;';
    btn.setAttribute('aria-label', '回到顶部');
    btn.title = '回到顶部';
    document.body.appendChild(btn);

    function toggleVisibility() {
      var scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    toggleVisibility();
  }

  // ============================================================
  //  7. 平滑滚动（为所有锚点链接）
  // ============================================================
  function initSmoothScroll() {
    document.addEventListener('click', function(e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;

      var target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Update URL hash without jump
      if (history.pushState) {
        history.pushState(null, null, '#' + targetId);
      }
    });
  }

  // ============================================================
  //  8. 图片懒加载（渐进增强用）
  // ============================================================
  function initLazyImages() {
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading — add attribute to images
      var images = document.querySelectorAll('img:not([loading])');
      images.forEach(function(img) {
        // Only lazy-load images below the fold (not hero images)
        if (!img.closest('.hero-banner') && !img.closest('.chapter-hero-full')) {
          img.setAttribute('loading', 'lazy');
        }
      });
    }
  }

  // ============================================================
  //  9. 上一节 / 下一节 导航
  // ============================================================
  function initPrevNextNav() {
    // 页面序列：按教材顺序排列所有页面路径
    var pageSequence = [
      'chapters/chapter1/',
      'chapters/1-1/',
      'chapters/1-2/',
      'chapters/1-3/',
      'chapters/1-4/',
      'chapters/1-5/',
      'chapters/chapter2/',
      'chapters/2-1/',
      'chapters/2-2/',
      'chapters/2-3/',
      'chapters/2-4/',
      'chapters/chapter3/',
      'chapters/3-1/',
      'chapters/3-2/',
      'chapters/3-3/',
      'chapters/3-4/',
      'chapters/3-5/',
      'chapters/chapter4/',
      'chapters/4-1/',
      'chapters/4-2/',
      'chapters/4-3/',
      'chapters/4-4/',
      'chapters/4-5/',
      'chapters/chapter5/',
      'chapters/5-1/',
      'chapters/5-2/',
      'chapters/5-3/',
      'chapters/5-4/',
      'chapters/5-5/',
      'chapters/5-6/',
      'chapters/chapter6/',
      'chapters/6-1/',
      'chapters/6-2/',
      'chapters/6-3/',
      'chapters/6-4/',
      'chapters/6-5/',
      'chapters/6-6/',
      'chapters/chapter7/',
      'chapters/7-1/',
      'chapters/7-2/',
      'chapters/7-3/',
      'chapters/7-4/',
      'chapters/7-5/'
    ];

    var path = window.location.pathname;
    // 标准化路径：去掉前导和尾部斜杠的差异
    var normalizedPath = path.replace(/^\/+|\/+$/g, '').toLowerCase();
    var currentIndex = -1;

    for (var i = 0; i < pageSequence.length; i++) {
      var seqPath = pageSequence[i].replace(/^\/+|\/+$/g, '').toLowerCase();
      if (normalizedPath === seqPath) {
        currentIndex = i;
        break;
      }
    }

    // 不是教材章节页面，不添加导航
    if (currentIndex === -1) return;

    var prevPage = currentIndex > 0 ? pageSequence[currentIndex - 1] : null;
    var nextPage = currentIndex < pageSequence.length - 1 ? pageSequence[currentIndex + 1] : null;

    var navHtml = '<nav class="prev-next-nav" aria-label="章节导航">';

    if (prevPage) {
      // 提取标题：从路径中推断
      var prevLabel = getPageLabel(prevPage);
      navHtml += '<a href="/' + prevPage + '" class="prev-next-link prev-link" title="上一节">';
      navHtml += '<span class="prev-next-arrow">&#8592;</span>';
      navHtml += '<span class="prev-next-label"><span class="prev-next-hint">上一节</span><span class="prev-next-title">' + prevLabel + '</span></span>';
      navHtml += '</a>';
    } else {
      navHtml += '<span class="prev-next-link prev-link disabled"></span>';
    }

    if (nextPage) {
      var nextLabel = getPageLabel(nextPage);
      navHtml += '<a href="/' + nextPage + '" class="prev-next-link next-link" title="下一节">';
      navHtml += '<span class="prev-next-label"><span class="prev-next-hint">下一节</span><span class="prev-next-title">' + nextLabel + '</span></span>';
      navHtml += '<span class="prev-next-arrow">&#8594;</span>';
      navHtml += '</a>';
    } else {
      navHtml += '<span class="prev-next-link next-link disabled"></span>';
    }

    navHtml += '</nav>';

    // 插入到文章内容末尾
    var contentArea = document.querySelector('.md-content__inner');
    if (contentArea) {
      contentArea.insertAdjacentHTML('beforeend', navHtml);
    }
  }

  function getPageLabel(pagePath) {
    // 从路径中提取章节编号作为标签
    var match = pagePath.match(/chapter(\d+)/);
    if (match && pagePath.indexOf('/chapter') > -1 && pagePath.indexOf('-') === -1) {
      return '第' + toChineseNum(match[1]) + '章 概述';
    }
    match = pagePath.match(/(\d+)-(\d+)/);
    if (match) {
      return match[1] + '.' + match[2];
    }
    return pagePath;
  }

  function toChineseNum(n) {
    var digits = ['零','一','二','三','四','五','六','七','八','九','十'];
    var num = parseInt(n, 10);
    if (num <= 10) return digits[num];
    if (num < 20) return '十' + digits[num - 10];
    return digits[Math.floor(num/10)] + '十' + (num % 10 ? digits[num % 10] : '');
  }

  // ============================================================
  //  初始化所有模块
  // ============================================================
  function init() {
    initReadingProgress();
    initImgCompare();
    initTimeline();
    initTabs();
    initGlossary();
    initBackToTop();
    initSmoothScroll();
    initLazyImages();
    initPrevNextNav();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
