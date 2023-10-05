"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityService = void 0;
class UtilityService {
    callFromOtherClass() {
        const t0 = performance.now();
        let i;
        for (i = 0; i <= 6000000000; i++) {
        }
        const t1 = performance.now();
        const timeTakenInSeconds = (t1 - t0) / 1000;
        console.log(`Time taken: ${timeTakenInSeconds} seconds to run this function`);
    }
    checkHeapSize() {
        let currentHeapSize = process.memoryUsage().heapUsed / 1024 / 1024;
        let allocatedHeapSize = 512;
        let percentage = (currentHeapSize / allocatedHeapSize) * 100;
        console.log(`Consumer_! Heap currentHeapSize: ${currentHeapSize.toFixed(2)} MB. Percentage: ${percentage} %`);
        return percentage;
    }
    checkMaxHeap() {
        let v8 = require('v8');
        let heapStats = v8.getHeapStatistics();
        let maxHeapSize = heapStats.heap_size_limit / (1024 * 1024);
        console.log(`Current maximum heap size: ${maxHeapSize.toFixed(2)} MB`);
    }
    checkCPU() {
        let os = require('os');
        let cpuUsage = os.cpus();
        console.log(cpuUsage);
    }
}
exports.UtilityService = UtilityService;
//# sourceMappingURL=utility.service.js.map