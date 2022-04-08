<?php

namespace App\Repository;

use App\Entity\ExaminationSheet;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ExaminationSheet|null find($id, $lockMode = null, $lockVersion = null)
 * @method ExaminationSheet|null findOneBy(array $criteria, array $orderBy = null)
 * @method ExaminationSheet[]    findAll()
 * @method ExaminationSheet[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExaminationSheetRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ExaminationSheet::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(ExaminationSheet $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(ExaminationSheet $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return ExaminationSheet[] Returns an array of ExaminationSheet objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ExaminationSheet
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
