<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class TwigExtension extends AbstractExtension
{
    public function getFunctions(): array
    {
        return [
            new TwigFunction('plural', [$this, 'plural']),
        ];
    }
    /**
     * @example:
     * {{ ['Время истекло', 'Остался %d час', 'Осталось %d часа', 'Осталось %d часов']|plural(17) }}
     *
     * @param int $number number rows to ending determine
     * @param array $words nouns or endings words for (0, 1, 4, 5)
     * @return string
     */
    public function plural(array $words, int $number): string
    {
        if ($number === 0) return $words[0];

        $cases = [3, 1, 2, 2, 2, 3];
        return sprintf($words[
            ($number % 100 > 4 && $number % 100 < 20)
                ? 3
                : $cases[min($number % 10, 5)]
        ], $number);
    }
}