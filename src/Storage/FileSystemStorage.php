<?php

namespace App\Storage;

use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\PropertyMapping;
use Vich\UploaderBundle\Storage\StorageInterface;

class FileSystemStorage implements StorageInterface
{
    protected function doUpload(PropertyMapping $mapping, File $file, ?string $dir, string $name): void
    {
        return;
    }

    protected function doRemove(PropertyMapping $mapping, ?string $dir, string $name): ?bool
    {
        return false;
    }

    protected function doResolvePath(
        PropertyMapping $mapping,
        ?string $dir,
        string $name,
        ?bool $relative = false
    ): string {
        return '';
    }

    public function upload(object $obj, PropertyMapping $mapping): void
    {
    }

    public function remove(object $obj, PropertyMapping $mapping): ?bool
    {
        return false;
    }

    public function resolvePath(
        object|array $obj,
        ?string $fieldName = null,
        ?string $className = null,
        ?bool $relative = false
    ): ?string {
        return null;
    }

    public function resolveUri(object|array $obj, ?string $fieldName = null, ?string $className = null): ?string
    {
        return null;
    }

    public function resolveStream(object|array $obj, string $fieldName, ?string $className = null)
    {
    }
}